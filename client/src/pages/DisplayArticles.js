import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

import {
    Container,
    Col,
    Button,
    Card,
    Row,
} from 'react-bootstrap';

import Auth from '../utils/auth';
import fetchNews from '../utils/API';
import { saveArticleIds, getSavedArticleIds } from '../utils/localStorage';
import { SAVE_ARTICLE } from '../utils/mutations';


const DisplayArticles = () => {
    // state for holding returned news api data
    // const [newsArticles, setnewsArticles] = useState([]);

    // state to hold saved articleId values
    const [savedArticleIds, setsavedArticleIds] = useState(getSavedArticleIds());

    // useEffect hook to save `savedArticleIds` list to localStorage on component unmount
    useEffect(() => {
        return () => saveArticleIds(savedArticleIds);
    });

    const [saveArticle] = useMutation(SAVE_ARTICLE);


    // for fetching news articles with offset - loading more articles
    const [articles, setArticles] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const fetchNextArticles = () => {
        setIsLoading(true);

        // Fetch 20 articles - offset param allows us to get different sets of articles
        fetchNews(offset)
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
                setOffset((prevOffset) => prevOffset + 20);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
            });
    };

    // useEffect(() => {
    //     // Fetch the initial 20 articles when the component mounts
    //     fetchNextArticles();
    // }, []); // The empty dependency array ensures this effect runs only once
    useEffect(() => {
        // Fetch the initial 20 articles when the component mounts
        fetchNextArticles();
    }, []);



    // create function to handle saving an article to our database
    const handlesaveArticle = async (articleId) => {
        // find the article in `newsArticles` state by the matching id
        const articleToSave = articles.find((article) => article.articleId === articleId);
        console.log("articleToSave is ", articleToSave);
        // get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        console.log("token is ", token);
        if (!token) {
            return false;
        }

        try {
            // Execute the saveArticle mutation
            const { data } = await saveArticle({ variables: { newsData: { ...articleToSave } } });
            console.log("data is ", data);
            // if article successfully saves to user's account, save article id to state
            setsavedArticleIds([...savedArticleIds, articleToSave.articleId]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="text-light bg-dark p-5">
                <Container>
                    <h1>Latest News</h1>
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
                                    <a href={news.link} target="_blank" rel="noreferrer">
                                        <Card.Body>
                                            <Card.Title>{news.title}</Card.Title>
                                            <Card.Text>{news.description}</Card.Text>
                                            {Auth.loggedIn() && (
                                                <Button
                                                    disabled={savedArticleIds?.some((savedArticleId) => savedArticleId === news.articleId)}
                                                    className='btn-block btn-info'
                                                    onClick={() => handlesaveArticle(news.articleId)}>
                                                    {savedArticleIds?.some((savedArticleId) => savedArticleId === news.articleId)
                                                        ? 'This article has already been saved!'
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