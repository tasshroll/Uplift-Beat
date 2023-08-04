import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';

import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap'

// import modules for GraphQL
import { GET_ME } from '../utils/queries';
import { REMOVE_ARTICLE } from '../utils/mutations';


import Auth from '../utils/auth';
import { removeArticleId } from '../utils/localStorage';

const SavedArticles = () => {
};

export default SavedArticles;
