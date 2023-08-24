// TODO correct this problem - when i click "Save Article" button, the article is saved
// When I view saved articles, the article is there and when I go back to my home page, the article is still there but the
// button below it shows "Save Article" instead of "Saved" 
import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import {
    Container,
    Col,
    Button,
    Card,
    Row,
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { fetchNews } from '../utils/API.js';

import { saveArticleIds, getSavedArticleIds } from '../utils/localStorage';
import { SAVE_ARTICLE } from '../utils/mutations';
import jwtDecode from 'jwt-decode';
import Typewriter from 'typewriter-effect';

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

    // hooks and variables for saved articles
    const [savedArticleIds, setsavedArticleIds] = useState(getSavedArticleIds());

    useEffect(() => {
        return () => {
            if (savedArticleIds) {
                saveArticleIds(savedArticleIds);
            }
        };
    }, [savedArticleIds]);

    const [saveArticle] = useMutation(SAVE_ARTICLE);

    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [displayedArticleIds, setDisplayedArticleIds] = useState([]);

    const fetchArticlesByQuery = (query) => {
        return fetchNews(query)
            .then((items) => {
                return items.map((news) => ({
                    uniqueId: news.uniqueId,
                    title: news.title,
                    description: news.description,
                    image: news.image || '',
                    link: news.link || '',
                }));
            })
            .catch((err) => {
                console.error(err);
                return [];
            });
    };

    const fetchNextArticles = () => {
        setIsLoading(true);

        const queries = ['uplifting', 'motivational', 'inspirational'];

        const fetchPromises = queries.map((query) => fetchArticlesByQuery(query));

        Promise.all(fetchPromises)
            .then((results) => {
                const allNewsData = results.flatMap((items) => items);
                // const uniqueNewsData = allNewsData.filter((news) => (
                //     !displayedArticleIds.includes(news.uniqueId)
                // ));
                console.log(allNewsData);

                // Filter out articles with duplicate titles from allNewsData and existing articles
                const filteredNewsData = allNewsData.filter((news) => (
                    !articles.some((article) => article.title === news.title)
                ));

                setArticles((prevArticles) => [...prevArticles, ...filteredNewsData]);
                setDisplayedArticleIds((prevIds) => [...prevIds, ...filteredNewsData.map((news) => news.uniqueId)]);
                console.log(displayedArticleIds);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchNextArticles();
    }, []);

    // save article by its unique id
    const handlesaveArticle = async (uniqueId) => {
        const articleToSave = articles.find((article) => article.uniqueId === uniqueId);
        console.log("article to save is", articleToSave);
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }

        try {
            // call mutation to saveArticle to DB
            await saveArticle({ variables: { articleData: { ...articleToSave } } });
            console.log("savedArticleIds is ", savedArticleIds);
            setsavedArticleIds([...savedArticleIds, articleToSave.uniqueId]);

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

        if (token) {
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
    // function to return random image
    const randomImage = () => {
        return images[Math.floor(Math.random() * images.length)];
    };

    // style page   
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

    // page layout
    return (
        <>
            {/* 
            <div className="text-light bg-dark p-5">
                <Container className="text-center">
                    {username && <h1>Hello {username}!</h1>}
                    <div style={{ color: "pink", fontSize: "2rem", fontWeight: "500", marginBottom: "30px" }}>
                        <Typewriter
                            options={{
                                strings: ['Welcome to Uplift Beat !'],
                                autoStart: true,
                                loop: true,
                            }}
                            onInit={(typewriter) => {
                                typewriter
                                    .start();
                            }}
                        />
                    </div>

                </Container>
            </div> */}
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



                        {articles.length
                            ? `Viewing ${articles.length} uplifting news articles posted ${currentDate}:`
                            : 'News articles are not available at this time.'}
                    </h2>
                    <Row>


                        {articles.map((news) => {
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
                        })}
                    </Row>
                    {
                        isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <Button
                                onClick={fetchNextArticles}
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