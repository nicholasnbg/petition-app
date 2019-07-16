const express = require('express');
const router = express.Router();
const petitionsData = require('../bin/petitions.json');
const values = require('lodash/fp/values');
const slice = require('lodash/fp/slice');
const pick = require('lodash/fp/pick');
const map = require('lodash/fp/map');
const sortBy = require('lodash/fp/sortBy');
const flow = require('lodash/fp/flow');

router.get("/", function(req, res, next) {
  const DEFAULT_PAGE_SIZE = 5;
  const pageSize = parseInt(req.query.size || DEFAULT_PAGE_SIZE);
  const page = parseInt(req.query.page || 1);
  const sort = req.query.sortBy || 'created_at';
  const petitions = flow(
    values,
    map((p) => {
      return pick([
        'id', 'petition_status', 'ask', 'display_title', 'description', 'slug',
        'created_at', 'photo', 'displayed_signature_count', 'calculated_goal', 'progress'
      ])(p);
    }),
    sortBy([sort])
  )(petitionsData);
  const start = (page - 1) * pageSize
  const end = start + pageSize;

  res.json({
    items: slice(start, end)(petitions),
    last_page: end >= petitions.length
  });
});

router.get("/:id", function(req, res, next) {
  res.json(petitionsData[req.params.id]);
});

module.exports = router;
