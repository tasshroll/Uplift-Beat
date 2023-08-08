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

                setArticles(() => [...newsData]);
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

                setArticles((prevArticles) => [...prevArticles, ...newsData]);
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

    const handlesaveArticle = async (articleId) => {
        const articleToSave = articles.find((article) => article.articleId === articleId);
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }

        try {
            await saveArticle({ variables: { articleData: { ...articleToSave } } });
            setsavedArticleIds([...savedArticleIds, articleToSave.articleId]);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSaveButtonClick = (event, articleId) => {
        event.preventDefault();
        handlesaveArticle(articleId);
    };

    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = today.toLocaleDateString(undefined, options);
        setCurrentDate(formattedDate);
    }, []);

    const [username, setUsername] = useState('');

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
                    <div style={{ color: "orange", fontSize: "2rem", fontWeight: "500", marginBottom: "30px" }}>
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
                        : 'News articles are not available at this time.'}
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