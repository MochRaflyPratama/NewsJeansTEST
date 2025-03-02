import React, {useEffect, useState} from "react";
import {View,StyleSheet,Text,SafeAreaView, FlatList} from "react-native";
import Article from "../components/Article";
import axios from "axios";


const HomeScreen = () => {
    const [articles,setArticles] = useState([]);
    const getNews = () => {
        axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=230e825b57824fd6aa417b4aeb488217',{
            params:{
                category: "technology",
            }
        })
            .then( (response) =>{
                // handle success
                setArticles(response.data.articles);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    useEffect(() => {
        getNews();
    },[]);

    return(
        <SafeAreaView style={styles.container}>
            <FlatList
                data={articles}
                renderItem = {({item}) =>
                    <Article
                        urlToImage = {item.urlToImage}
                        title = {item.title}
                        description = {item.description}
                        author = {item.author}
                        publishedAt = {item.publishedAt}
                        sourceName = {item.source.name}
                        url={item.url}
                    />}
                keyExtractor={(item, index) => `${item.title}-${index}`}
            />

        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
    }
})