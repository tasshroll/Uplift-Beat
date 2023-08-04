import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';

import Auth from '../utils/auth';
//import { saveArticle, searchGoogleBooks } from '../utils/API';
import { fetchNews } from '../utils/API';

import { saveArticleIds, getSavedArticleIds } from '../utils/localStorage';
// query needed for apollo server
import { SAVE_ARTICLES } from '../utils/mutations';


const SearchArticles = () => {
  // create state for holding returned news api data
  const [searchedArticles, setsearchedArticles] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved articleId values
  const [savedArticleIds, setsavedArticleIds] = useState(getSavedArticleIds());

  // set up useEffect hook to save `savedArticleIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveArticleIds(savedArticleIds);
  });

  // Define the mutation hook
  const [saveArticle] = useMutation(SAVE_ARTICLES);  // added


  // create method to search for books and set state on form submit
  const displayNews = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetchNews();

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const newsData = items.map((news) => ({
        articleId: news.id,
        title: news.title,
        description: news.description,
        image: news.image?.thumbnail || '',
        link: news.link || '',  
      }));
      // setsearchedArticles will update searchedArticles with a list of all retreived articles 
      setsearchedArticles(newsData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };






  // const { data } = await saveArticle({ variables: { newsData: {...bookToSave} } }); 



  // create function to handle saving a book to our database
  const handlesaveArticle = async (articleId) => {
    // find the article in `searchedArticles` state by the matching id
    const articleToSave = searchedArticles.find((book) => article.articleId === articleId);
    console.log("articleToSave is ", articleToSave);
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log ("token is ", token);
    if (!token) {
      return false;
    }

    try {      
      // Execute the saveArticle mutation
      const { data } = await saveArticle({ variables: { newsData: {...bookToSave} } }); 


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
          {searchedArticles.length
            ? `Viewing ${searchedArticles.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <Row>
          {searchedArticles.map((news) => {
            return (
              <Col md="4" key={book.articleId}>
                <Card key={news.articleId} border='dark'>
                  {news.image ? (
                    <Card.Img src={news.image} alt={`The cover for ${news.title}`} variant='top' />
                  ) : null}
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
                          : 'Save this Article!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SearchArticles;