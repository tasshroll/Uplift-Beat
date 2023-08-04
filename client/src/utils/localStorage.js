export const getSavedArticleIds = () => {
    const savedArticleIds = localStorage.getItem('saved_articles')
        ? JSON.parse(localStorage.getItem('saved_articles'))
        : [];

    return savedArticleIds;
};

export const saveArticleIds = (articleIdArr) => {
    if (articleIdArr.length) {
        localStorage.setItem('saved_articles', JSON.stringify(articleIdArr));
    } else {
        localStorage.removeItem('saved_articles');
    }
};

export const removeArticleId = (articleId) => {
    const savedArticleIds = localStorage.getItem('saved_articles')
        ? JSON.parse(localStorage.getItem('saved_articles'))
        : null;

    if (!savedArticleIds) {
        return false;
    }

    const updatedSavedArticleIds = savedArticleIds?.filter((savedArticleId) => savedArticleId !== articleId);
    localStorage.setItem('saved_articles', JSON.stringify(updatedSavedArticleIds));

    return true;
};
