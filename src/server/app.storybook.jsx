import express from 'express';
import path from 'path';

module.exports = (app) => {
  app.use(express.static(path.join(__dirname, '../../__storybook__')));
};
