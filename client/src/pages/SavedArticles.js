import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import {
  Container,
  Col,
  Button,
  Card,
  Row,
} from 'react-bootstrap';

import { GET_ME } from '../utils/queries';
import { REMOVE_ARTICLE } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeArticleId } from '../utils/localStorage';

const SavedArticles = () => {
  const [savedArticles, setSavedArticles] = useState([]);

  const { loading, data } = useQuery(GET_ME);
  const [removeArticle] = useMutation(REMOVE_ARTICLE);

  useEffect(() => {
    if (data && data.me) {
      setSavedArticles(data.me.savedArticles);
    }
  }, [data]);

  const handleRemoveArticle = async (articleId) => {
    try {
      await removeArticle({ variables: { articleId } });
      setSavedArticles(savedArticles.filter((article) => article.articleId !== articleId));
      removeArticleId(articleId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

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
              <a href={article.link} target="_blank" rel="noreferrer">
                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text>{article.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleRemoveArticle(article.articleId)}
                    >
                      Remove Article
                    </Button>
                  )}
                </Card.Body>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SavedArticles;
