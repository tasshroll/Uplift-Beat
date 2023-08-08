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
import { fetchNews, fetchNews2, fetchNews3 } from '../utils/API.js';

import { saveArticleIds, getSavedArticleIds } from '../utils/localStorage';
import { SAVE_ARTICLE } from '../utils/mutations';
import jwtDecode from 'jwt-decode';
import Typewriter from 'typewriter-effect';


const DisplayArticles = () => {
    // state for holding returned news api data
    // const [newsArticles, setnewsArticles] = useState([]);

    // state to hold saved articleId values
    const [savedArticleIds, setsavedArticleIds] = useState(getSavedArticleIds());

    // useEffect hook to save `savedArticleIds` list to localStorage on component unmount
    useEffect(() => {
        return () => {
            if (savedArticleIds) {
                saveArticleIds(savedArticleIds);
            }
        };
    }, [savedArticleIds]);

    const [saveArticle] = useMutation(SAVE_ARTICLE);


    // for fetching news articles with offset - loading more articles
    const [articles, setArticles] = useState([]);
    //const [ setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const fetchNextArticles = () => {
        setIsLoading(true);

        fetchNews()
            .then((items) => {
                const newsData = items.map((news) => ({
                    articleId: news.articleId,
                    title: news.title,
                    description: news.description,
                    image: news.image || '',
                    link: news.link || '',
                }));

                // Append the new articles to the existing articles state
                setArticles(() => [ ...newsData]);
                setIsLoading(false);

            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
            });

            fetchNews2()
            .then((items) => {
                const newsData = items.map((news) => ({
                    articleId: news.articleId,
                    title: news.title,
                    description: news.description,
                    image: news.image || '',
                    link: news.link || '',
                }));

                // Append the new articles to the existing articles state
                setArticles((prevArticles) => [...prevArticles, ...newsData]);
                setIsLoading(false);

            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
            });

            fetchNews3()
            .then((items) => {
                const newsData = items.map((news) => ({
                    articleId: news.articleId,
                    title: news.title,
                    description: news.description,
                    image: news.image || '',
                    link: news.link || '',
                }));

                // Append the new articles to the existing articles state
                setArticles((prevArticles) => [...prevArticles, ...newsData]);
                setIsLoading(false);

            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
            });
    };

// The empty dependency array ensures this effect runs only once
    useEffect(() => {
        // Fetch the initial articles when the component mounts
        // console.log("fetchingnewsarticles")
        // get_news().then(data => console.log(data))
        fetchNextArticles();
    }, []);

    // create function to handle saving an article to our database
    const handlesaveArticle = async (articleId) => {
        // find the article in `newsArticles` state by the matching id
        const articleToSave = articles.find((article) => article.articleId === articleId);
        // get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }

        try {
            // Execute the saveArticle mutation
            const { data } = await saveArticle({ variables: { articleData: { ...articleToSave } } });
            // if article successfully saves to user's account, save article id to state
            setsavedArticleIds([...savedArticleIds, articleToSave.articleId]);
        } catch (err) {
            console.error(err);
        }
    };

    // When user clicks Save Article, call handlesaveArticle function to save article
    const handleSaveButtonClick = (event, articleId) => {
        event.preventDefault();
        handlesaveArticle(articleId);
    };

    // create state to hold the current date
    const [currentDate, setCurrentDate] = useState('');

    // update current date when the component mounts
    useEffect(() => {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = today.toLocaleDateString(undefined, options);
        setCurrentDate(formattedDate);
    }, []);

    const [username, setUsername] = useState('');

    // get username from token on component mount
    useEffect(() => {
        const token = localStorage.getItem('id_token');

        if (token) {
            try {

                // Decode the token to get the username
                const decodedToken = jwtDecode(token);
                const displayName = decodedToken.data.username;
                setUsername(displayName);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []);

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
    };

    return (
        <>

            <div className="text-light bg-dark p-5">
                <Container className="text-center">
                    {username && <h1>Hello {username}!</h1>}
                    <div style={{ color: "white", fontSize: "2rem", fontWeight: "500", marginBottom: "30px" }}>
                        <Typewriter
                            options={{
                                strings: ['Welcome to Jolly Journal News!'],
                                autoStart: true,
                                loop: true,
                            }}
                            onInit={(typewriter) => {
                                typewriter
                                    .start();
                            }}
                        />
                    </div>

                    <h1>Latest articles from {currentDate} </h1>
                </Container>
            </div>

            <Container>
                <h2 className='pt-5'>
                    {articles.length
                        ? `Viewing ${articles.length} results:`
                        : 'News is not available at this time. Please try again later.'}
                </h2>
                <Row>
                    {articles.map((news) => {
                        return (
                            <Col md="4" key={news.articleId}>
                                <Card key={news.articleId} border='dark'>
                                    {news.image ? (
                                        <Card.Img src={news.image} alt={`The cover for ${news.title}`} variant='top' />
                                    ) : null}
                                    <a href={news.link} target="_blank" rel="noreferrer" style={styles.linkStyle}>

                                        <Card.Body>
                                            <Card.Title style={styles.title}>{news.title}</Card.Title>
                                            <Card.Text>{news.description}</Card.Text>
                                            {Auth.loggedIn() && (
                                                <Button
                                                    disabled={savedArticleIds?.some((savedArticleId) => savedArticleId === news.articleId)}
                                                    className='btn-block btn-info'
                                                    onClick={(event) => handleSaveButtonClick(event, news.articleId)}>
                                                    {savedArticleIds?.some((savedArticleId) => savedArticleId === news.articleId)
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
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <Button
                        onClick={fetchNextArticles}
                        disabled={isLoading}
                        className='btn-block btn-info'
                    >
                        Load More
                    </Button>
                )}
            </Container>
        </>
    );
};

export default DisplayArticles;