// React component to display saved articles for logged in user
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import {
  Container,
  Col,
  Button,
  Card,
  Row,
} from 'react-bootstrap';

import { removeArticleId, getSavedArticleIds } from '../utils/localStorage';

import { GET_ME } from '../utils/queries';
import { REMOVE_ARTICLE } from '../utils/mutations';
import Auth from '../utils/auth';

const SavedArticles = () => {
  const [savedArticles, setSavedArticles] = useState([]);

  // Get saved article ids from localStorage when the page loads
  const [savedArticleIds, setsavedArticleIds] = useState(getSavedArticleIds());

  // get saved articles from DB
  const userData = useQuery(GET_ME);
  const savedUserId = userData.data?.me || {};


  const [removeArticle] = useMutation(REMOVE_ARTICLE);

  // Get saved articles from User collection in DB to display
  useEffect(() => {
    if (userData.data?.me.savedArticles !== undefined) {

      setSavedArticles(userData.data?.me.savedArticles);
      //console.log("Saved articles is: ", savedArticles);
    }
  }, [userData], savedArticles);


  const handleRemoveArticle = async (e, articleId) => {
    e.preventDefault(); // Prevent the default navigation behavior
    try {
      //console.log("Removing article with id: ", articleId);

      // call mutation to remove article 
      await removeArticle({ variables: { articleId } });

      // Filter out the removed article 
      const updatedSavedArticles = savedArticles.filter((article) => article.uniqueId !== articleId);
      setSavedArticles(updatedSavedArticles);
      //console.log("Updated saved articles is: ", updatedSavedArticles);

      // Remove article from localStorage
      removeArticleId(articleId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <h2 className="pt-5">
        {savedArticles.length
          ? `Viewing ${savedArticles.length} saved articles:`
          : 'You have not saved any articles yet.'}
      </h2>
      <Row>
        {savedArticles.map((article) => (
          <Col md="4" key={article.articleId}>
            <Card key={article.articleId} border="dark">
              {article.image && (
                <Card.Img src={article.image} alt={`The cover for ${article.title}`} variant="top" />
              )}
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.description}</Card.Text>
                {Auth.loggedIn() && (
                  <Button
                    className="btn-block btn-danger"
                    onClick={(e) => handleRemoveArticle(e, article.uniqueId)}
                  >
                    Remove Article
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SavedArticles;
