
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';


import {
    Container,
    Col,
    Button,
    Card,
    Row,
} from 'react-bootstrap';

import Auth from '../utils/auth';

import { saveArticleIds, getSavedArticleIds } from '../utils/localStorage';
import { SAVE_ARTICLE } from '../utils/mutations';
import { GET_ME, GET_NEWS } from '../utils/queries';

import jwtDecode from 'jwt-decode';

import getRandomQuote from '../utils/quotes';
import { Carousel } from 'react-bootstrap';
// import all images from public/images folder
import Image1 from "../Assets/images/Image1.jpg"
import Image2 from "../Assets/images/Image2.jpg"
import Image3 from "../Assets/images/Image3.jpg"
import Image4 from "../Assets/images/Image4.jpg"
import Image5 from "../Assets/images/Image5.jpg"
import Image6 from "../Assets/images/Image6.jpg"
import Image7 from "../Assets/images/Image7.jpg"
import Image8 from "../Assets/images/Image8.jpg"
import Image9 from "../Assets/images/Image9.jpg"


const DisplayArticles = () => {
    // THIS CODE CAN BE REMOVED - We took it from local storage when we
    // fetched news from client side.  We are now fetching news from DB server side
    // these ids are retrrieved from localStorage when the page loads
    const [savedArticleIds, setsavedArticleIds] = useState(getSavedArticleIds());


    // saves article ids to localStorage on component unmount
    // useEffect(() => {
    //     return () => {
    //         if (savedArticleIds) {
    //             saveArticleIds(savedArticleIds);
    //         }
    //     };
    // }, [savedArticleIds]);


    ///////   GET NEWS FROM DB ////////
    // articles is an array of objects
    const [articles, setArticles] = useState([]);
    // count is the number of articles in the array
    const [count, setCount] = useState(0);

    // hook to fetch news from DB using GET_NEWS query
    const { loading, data } = useQuery(GET_NEWS);
    //console.log("client side news is", data);

    // when news is fetched from DB (GET_ NEWS query), update articles and count
    useEffect(() => {
        if (data) {
            console.log("data is", data);
            setArticles(data.getNews.news);
            setCount(data.getNews.newsCount);
        }
    }, [data]);
    //////////////////////////////////////////



    // isLoading is true when the app is fetching data from the API
    const [isLoading, setIsLoading] = useState(false);

    //////////////////////////////////////////////////////////
    // Get Saved Articles if user is logged in
    //////////////////////////////////////////////////////////

    // initialize the mutation to save article to DB 
    const [saveArticle] = useMutation(SAVE_ARTICLE);

    const [savedArticles, setSavedArticles] = useState([]);
    // get saved articles from DB
    const { userLoading, userData } = useQuery(GET_ME);

    useEffect(() => {
        if (userData && userData.me && Auth.loggedIn()) {
            setSavedArticles(data.me.savedArticles);

            // update array of saved article ids
            // if current article id is in array of saved articles, then true, else false
            setsavedArticleIds(
                data.me.savedArticles.map((saved) => 
                   (saved.uniqueId === articles.uniqueId)));
        } else {
            setSavedArticles([]);
        };
    }, [userData]);
    console.log("savedArticleIds is", savedArticleIds);



    // save article by its unique id
    const handlesaveArticle = async (uniqueId) => {
        const articleToSave = articles.find((article) => article.uniqueId === uniqueId);
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        console.log("token is", token);
        if (!token) {
            return false;
        }
        try {
            // call mutation to saveArticle to DB
            console.log("***** articleToSave is", articleToSave);
            const { __typename, ...articleData } = articleToSave;
            await saveArticle({ variables: { articleData } });
            // 
            const updatedSavedArticleIds = [...savedArticleIds, articleToSave.uniqueId];
            // add news article id to array
            setsavedArticleIds(updatedSavedArticleIds);
            saveArticleIds(updatedSavedArticleIds); // Update localStorage
            console.log("****** savedArticleIds is ", savedArticleIds);

        } catch (err) {
            console.error(err);
        }
    };

    const handleSaveButtonClick = (event, uniqueId) => {
        event.preventDefault();
        handlesaveArticle(uniqueId);
    };

    // display current date on page
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = today.toLocaleDateString(undefined, options);
        setCurrentDate(formattedDate);
    }, []);

    const [username, setUsername] = useState('');

    // get username from token
    useEffect(() => {
        const token = localStorage.getItem('id_token');

        if (Auth.loggedIn() && token) {
            try {

                const decodedToken = jwtDecode(token);
                const displayName = decodedToken.data.username;
                setUsername(displayName);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []);

    // array of images
    const images = [Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8, Image9];

    // function to return random image for quote
    const randomImage = () => {
        return images[Math.floor(Math.random() * images.length)];
    };

    // css to style this page   
    const styles = {
        linkStyle: {
            textDecoration: 'none',
            color: 'inherit'
        },
        header: {
            marginBottom: 30,
        },
        title: {
            fontSize: "1rem",
            fontWeight: "bold",
            textAlign: "center"
        },
        quoteContainer: {
            display: "flex",
            maxWidth: "80%",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "30px",
            marginTop: "30px",
            fontWeight: "bold",
            fontSize: ".75rem",
        },
        quote: {
            fontWeight: "bold",
            textAlign: "center",
            color: "black",
            fontSize: "1.3rem",
        },
        background: {
            backgroundColor: "#f0ebe1"
        },
        card: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '10px'
        },
    };
    if (loading) {
        return <p>Loading...</p>;
    }

    // page layout
    return (
        <>

            <div className="text-light bg-dark p-5">
                <Container className="text-center">
                    {username && <h1>Hello {username}!</h1>}
                    <div className="fade-in-text">Welcome to Uplift Beat!</div>
                </Container>
            </div>
            <div style={{ ...styles.background, paddingTop: '20px' }} className="mt-0">
                <Container >
                    <div  >
                        <Carousel slide={false} interval={7000}>

                            <Carousel.Item style={{
                                maxWidth: '100%', maxHeight: '200px'
                            }}>
                                <img src={randomImage()} alt="Second slide" />
                                <Carousel.Caption>
                                    <h3 style={styles.quote}>{getRandomQuote()}</h3>
                                </Carousel.Caption>
                            </Carousel.Item>


                            <Carousel.Item style={{
                                maxWidth: '100%', maxHeight: '200px'
                            }}>
                                <img src={randomImage()} alt="Second slide" />
                                <Carousel.Caption>
                                    <h3 style={styles.quote}>{getRandomQuote()}</h3>
                                </Carousel.Caption>
                            </Carousel.Item>


                            <Carousel.Item style={{
                                maxWidth: '100%', maxHeight: '200px'
                            }}>
                                <img src={randomImage()} alt="Second slide" />
                                <Carousel.Caption>
                                    <h3 style={styles.quote}>{getRandomQuote()}</h3>
                                </Carousel.Caption>
                            </Carousel.Item>

                        </Carousel>

                    </div >

                    <h2 className='pt-5'>

                        {count
                            ? `Viewing ${count} uplifting news articles posted ${currentDate}:`
                            : 'News articles are not available at this time.'}
                    </h2>
                    <Row>

                        {articles && articles.length > 0 ? (


                            articles.map((news) => {
                                return (
                                    <Col md="4" key={news.uniqueId}>
                                        <Card key={news.uniqueId} border='dark' style={styles.card}>
                                            {news.image ? (
                                                <Card.Img src={news.image} alt={`The cover for ${news.title}`} variant='top' />
                                            ) : null}
                                            <a href={news.link} target="_blank" rel="noreferrer" style={styles.linkStyle}>

                                                <Card.Body>
                                                    <Card.Title style={styles.title}>{news.title}</Card.Title>
                                                    <Card.Text>{news.description}</Card.Text>

                                                    {/* if user is logged in, display buttons under each article
                                                        display "Saved" button if article.uniqueId is in array of user saved articles, 
                                                        else display "Save Article" button */}

                                                    {Auth.loggedIn() && (
                                                        <Button
                                                            disabled={savedArticleIds?.some((id) => id === news.uniqueId)}
                                                            className='btn-block btn-info'
                                                            onClick={(event) => handleSaveButtonClick(event, news.uniqueId)}>
                                                            {savedArticleIds?.some((id) => id === news.uniqueId)
                                                                ? 'Saved'
                                                                : 'Save Article!'}
                                                        </Button>
                                                    )}
                                                </Card.Body>
                                            </a>
                                        </Card>
                                    </Col>
                                );
                            })

                        ) : (
                            <p></p>
                        )}
                    </Row>
                    {
                        isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <Button
                                disabled={isLoading}
                                className='btn-block btn-info'
                            >
                                Load More
                            </Button>
                        )
                    }
                </Container >
            </div>
        </>
    );
};

export default DisplayArticles;