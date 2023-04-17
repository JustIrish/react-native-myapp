import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  addDoc,
  collection,
  doc,
  orderBy,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import {
  View,
  Image,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
} from "react-native";
import date from "date-and-time";
import uk from "date-and-time/locale/uk";
import { db, auth } from "../../firebase/config";
import { Feather } from "@expo/vector-icons";
import Comment from "../../components/Comment";
import { selectId } from "../../redux/auth/authSelectors";

const CommentsScreen = ({ route }) => {
  const { photo, postId, autorPostId } = route.params;
  // const currentUid = auth.currentUser.uid;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const userId = useSelector(selectId);

  date.locale(uk);
  const commentDate = new Date();

  const createComment = async () => {
    if (comment === "") return;
    try {
      const time = date.format(new Date(), "D MMMM, YYYY | HH:mm");

      await addDoc(collection(db, "posts", postId, "comments"), {
        //  avatar,
        comment,
        time,
        autorCommentId: userId,
        commentDate,
      });
    } catch (err) {
      return Alert.alert(`Упс: ${err.message}`);
    }
    setComment("");
    Keyboard.dismiss;
  };

  const getAllComments = async () => {
    const q = query(
      collection(db, "posts", postId, "comments"),
      orderBy("commentDate")
    );
    const commentRef = doc(db, "posts", postId);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsArr = [];
      snapshot.forEach((doc) =>
        commentsArr.push({
          ...doc.data(),
          id: doc.id,
        })
      );
      updateDoc(commentRef, {
        commentCounter: commentsArr.length > 0 ? commentsArr.length : null,
      });

      setAllComments(commentsArr);
    });

    return () => {
      unsubscribe();
    };
  };

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <View style={styles.container}>
          <Image source={{ uri: photo }} style={styles.photo} />
          <View style={{ flex: 1 }}>
            <FlatList
              data={allComments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Comment
                  text={item.comment}
                  time={item.time}
                  autorPostId={autorPostId}
                  autorCommentId={item.autorCommentId}
                />
              )}
            />
          </View>
          <View>
            <TextInput
              value={comment}
              onChangeText={setComment}
              placeholder="Коментувати..."
              style={styles.input}
            />
            <Pressable style={styles.sendBtn} onPress={createComment}>
              <Feather name="arrow-up" size={24} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    overflow: "scroll",
  },
  photo: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginVertical: 32,
  },
  input: {
    fontFamily: "Roboto400",
    fontSize: 16,
    height: 50,
    padding: 16,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    marginBottom: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  sendBtn: {
    position: "absolute",
    top: 8,
    right: 10,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CommentsScreen;
