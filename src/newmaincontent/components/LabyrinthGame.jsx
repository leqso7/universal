import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import HomeButton from './HomeButton';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext.jsx';

const mazes = [
  // პირველი ლაბირინთი
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  // მეორე ლაბირინთი
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  // მესამე ლაბირინთი
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  // მეოთხე ლაბირინთი
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  // მეხუთე ლაბირინთი
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  // მეექვსე ლაბირინთი
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  // მეშვიდე ლაბირინთი
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  // მერვე ლაბირინთი
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  // მეცხრე ლაბირინთი
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  // მეათე ლაბირინთი
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  // მეთერთმეტე ლაბირინთი
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  // მეთორმეტე ლაბირინთი
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  // მეცამეტე ლაბირინთი
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  // მეთოთხმეტე ლაბირინთი
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  // მეთხუთმეტე ლაბირინთი
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
];

const mazeCharacters = [
  { 
    char1: '🐱', char2: '🐶',
    target1: '🐟', target2: '🦴',
    description: 'კატა ეძებს თევზს, ძაღლი - ძვალს'
  },
  { 
    char1: '🐭', char2: '🐰',
    target1: '🧀', target2: '🥕',
    description: 'თაგვი ეძებს ყველს, კურდღელი - სტაფილოს'
  },
  { 
    char1: '🦊', char2: '🐻',
    target1: '🍗', target2: '🍯',
    description: 'მელია ეძებს ქათამს, დათვი - თაფლს'
  },
  {
    char1: '🐵', char2: '🐘',
    target1: '🍌', target2: '🥜',
    description: 'მაიმუნი ეძებს ბანანს, სპილო - არაქისს'
  },
  {
    char1: '🦁', char2: '🦒',
    target1: '🥩', target2: '🌿',
    description: 'ლომი ეძებს ხორცს, ჟირაფი - ფოთლებს'
  },
  {
    char1: '🐼', char2: '🦘',
    target1: '🎋', target2: '🌾',
    description: 'პანდა ეძებს ბამბუკს, კენგურუ - ბალახს'
  },
  {
    char1: '🦅', char2: '🦝',
    target1: '🐠', target2: '🥚',
    description: 'არწივი ეძებს თევზს, ენოტი - კვერცხს'
  },
  {
    char1: '🦍', char2: '🦦',
    target1: '🍎', target2: '🐚',
    description: 'გორილა ეძებს ვაშლს, წავი - ნიჟარას'
  },
  {
    char1: '🦩', char2: '🦨',
    target1: '🦐', target2: '🍇',
    description: 'ფლამინგო ეძებს კრევეტს, სკუნსი - ყურძენს'
  },
  {
    char1: '🦡', char2: '🦃',
    target1: '🍄', target2: '🌰',
    description: 'მაჩვი ეძებს სოკოს, ინდაური - რკოს'
  },
  {
    char1: '🦫', char2: '🦥',
    target1: '🌳', target2: '🍃',
    description: 'თახვი ეძებს ხეს, ზარმაცა - ფოთლებს'
  },
  {
    char1: '🦙', char2: '🦛',
    target1: '🌿', target2: '🌱',
    description: 'ლამა ეძებს ბალახს, ბეჰემოთი - ლერწამს'
  },
  {
    char1: '🦌', char2: '🦊',
    target1: '🍁', target2: '🐇',
    description: 'ირემი ეძებს ფოთოლს, მელია - კურდღელს'
  },
  {
    char1: '🦜', char2: '🦡',
    target1: '🥥', target2: '🍯',
    description: 'თუთიყუში ეძებს ქოქოსს, მაჩვი - თაფლს'
  },
  {
    char1: '🦢', char2: '🦦',
    target1: '🐸', target2: '🐟',
    description: 'გედი ეძებს ბაყაყს, წავი - თევზს'
  },
  {
    char1: '🦚', char2: '🦨',
    target1: '🪱', target2: '🍓',
    description: 'ფარშევანგი ეძებს ჭიას, სკუნსი - მარწყვს'
  },
  {
    char1: '🦃', char2: '🦝',
    target1: '🌽', target2: '🍎',
    description: 'ინდაური ეძებს სიმინდს, ენოტი - ვაშლს'
  },
  {
    char1: '🦘', char2: '🐨',
    target1: '🌾', target2: '🌿',
    description: 'კენგურუ ეძებს ბალახს, კოალა - ევკალიპტს'
  },
  {
    char1: '🦬', char2: '🦅',
    target1: '🌱', target2: '🐍',
    description: 'ბიზონი ეძებს ბალახს, არწივი - გველს'
  }
];

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(-45deg, #64ccf0cc, #80d0c7cc, #56bcbdcc, #52b69acc);
`;

const MazeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(15, 30px);
  gap: 1px;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 10px;
  margin: 20px 0;
`;

const Cell = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background-color: ${props => props.isWall ? '#4a90e2' : 'white'};
  border-radius: 4px;
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  margin: 20px 0;
  font-size: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const CharacterSelector = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;
`;

const CharacterButton = styled.button`
  padding: 10px 20px;
  font-size: 1.2rem;
  background: ${props => props.isSelected ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.7);
  }
`;

const WinMessage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.9);
  padding: 20px 40px;
  border-radius: 10px;
  font-size: 1.5rem;
  color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  text-align: center;
`;
const TestButton = styled.button`
  padding: 10px 20px;
  font-size: 1.2rem;
  background: rgba(100, 100, 255, 0.7);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 20px;

  &:hover {
    background: rgba(100, 100, 255, 0.9);
  }
`;

const Description = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 15px;
  border-radius: 10px;
  margin: 10px 0;
  font-size: 1.2rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  .emoji-hint {
    font-size: 1.5rem;
    margin: 0 5px;
  }

  .active-character {
    background: rgba(100, 200, 255, 0.3);
    padding: 5px 10px;
    border-radius: 5px;
    margin: 5px;
    display: inline-block;
  }
`;

const findFreePosition = (maze, excludePositions = [], minDistance = 3, isTarget = false) => {
  const freeCells = [];
  
  const calculateDistance = (pos1, pos2) => {
    return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
  };
  
  const hasWallBetween = (pos1, pos2) => {
    const dx = pos2.x - pos1.x;
    const dy = pos2.y - pos1.y;
    const steps = Math.max(Math.abs(dx), Math.abs(dy));
    
    for (let i = 1; i <= steps; i++) {
      const x = pos1.x + Math.round((dx * i) / steps);
      const y = pos1.y + Math.round((dy * i) / steps);
      if (maze[y][x] === 1) return true;
    }
    return false;
  };
  
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      if (maze[y][x] === 0) {
        const pos = { x, y };
        const isExcluded = excludePositions.some(
          excl => excl && excl.x === x && excl.y === y
        );
        
        const hasMinDistance = excludePositions.every(excl => 
          !excl || calculateDistance(pos, excl) >= minDistance
        );

        const hasObstacles = !isTarget || excludePositions.every(excl =>
          !excl || hasWallBetween(pos, excl)
        );
        
        if (!isExcluded && hasMinDistance && hasObstacles) {
          freeCells.push(pos);
        }
      }
    }
  }
  
  if (freeCells.length === 0) {
    if (minDistance > 1) {
      return findFreePosition(maze, excludePositions, minDistance - 1, isTarget);
    }
    return null;
  }
  
  const center = { x: 7, y: 5 };
  freeCells.sort((a, b) => {
    const distA = calculateDistance(a, center);
    const distB = calculateDistance(b, center);
    return distB - distA;
  });
  
  return freeCells[Math.floor(Math.random() * Math.min(freeCells.length, 3))];
};

const isValidMove = (pos, maze) => {
  if (!pos || !maze) return false;
  return pos.x >= 0 && pos.x < maze[0].length && 
         pos.y >= 0 && pos.y < maze.length && 
         maze[pos.y][pos.x] === 0;
};

const LabyrinthGame = () => {
  const navigate = useNavigate();
  const [currentMaze, setCurrentMaze] = useState(0);
  const [char1Pos, setChar1Pos] = useState(null);
  const [char2Pos, setChar2Pos] = useState(null);
  const [target1Pos, setTarget1Pos] = useState(null);
  const [target2Pos, setTarget2Pos] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState('char1');
  const [char1ReachedTarget, setChar1ReachedTarget] = useState(false);
  const [char2ReachedTarget, setChar2ReachedTarget] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  
  const { updateGameProgress, getGameStats } = usePlayer();
  const stats = useMemo(() => getGameStats('labyrinth'), [getGameStats]);
  const completedMazes = useMemo(() => stats?.completedTasks || new Set(), [stats]);

  const currentCharacters = mazeCharacters[currentMaze];

  const initPositions = useCallback(() => {
    const currentMazeData = mazes[currentMaze];
    if (!currentMazeData) return;
    
    // პირველი ცხოველის პოზიცია
    const char1 = findFreePosition(currentMazeData, [], 3);
    if (!char1) return;
    
    // პირველი სამიზნის პოზიცია
    const target1 = findFreePosition(currentMazeData, [char1], 3, true);
    if (!target1) return;
    
    // მეორე ცხოველის პოზიცია
    const char2 = findFreePosition(currentMazeData, [char1, target1], 3);
    if (!char2) return;
    
    // მეორე სამიზნის პოზიცია
    const target2 = findFreePosition(currentMazeData, [char1, target1, char2], 3, true);
    if (!target2) return;

    // პოზიციების განახლება
    setChar1Pos(char1);
    setTarget1Pos(target1);
    setChar2Pos(char2);
    setTarget2Pos(target2);
    
    // საწყისი მდგომარეობის გადაყენება
    setChar1ReachedTarget(false);
    setChar2ReachedTarget(false);
    setGameWon(false);
    setSelectedCharacter('char1');
  }, [currentMaze]);

  const findFirstUncompletedMaze = useCallback(() => {
    let index = 0;
    while (completedMazes.has(index) && index < mazes.length) {
      index++;
    }
    return index >= mazes.length ? 0 : index;
  }, [completedMazes]);

  useEffect(() => {
    if (currentMaze !== undefined && currentMaze !== null) {
      initPositions();
    }
  }, [currentMaze, initPositions]);

  useEffect(() => {
    const newIndex = findFirstUncompletedMaze();
    setCurrentMaze(newIndex);
  }, [findFirstUncompletedMaze]);

  useEffect(() => {
    if (char1ReachedTarget && !char2ReachedTarget) {
      setSelectedCharacter('char2');
    }
  }, [char1ReachedTarget]);

  useEffect(() => {
    if (char1ReachedTarget && char2ReachedTarget) {
      setGameWon(true);
      const timestamp = Date.now();
      updateGameProgress('labyrinth', timestamp, { 
        mazeIndex: currentMaze,
        completed: true
      });
      
      setTimeout(() => {
        setCurrentMaze(prev => (prev + 1) % mazes.length);
        setChar1Pos(null);
        setChar2Pos(null);
        setTarget1Pos(null);
        setTarget2Pos(null);
        setChar1ReachedTarget(false);
        setChar2ReachedTarget(false);
        setGameWon(false);
        setSelectedCharacter('char1');
      }, 1500);
    }
  }, [char1ReachedTarget, char2ReachedTarget, currentMaze, updateGameProgress]);

  const moveCharacter = (direction) => {
    const currentPos = selectedCharacter === 'char1' ? char1Pos : char2Pos;
    const targetPos = selectedCharacter === 'char1' ? target1Pos : target2Pos;
    const otherCharPos = selectedCharacter === 'char1' ? char2Pos : char1Pos;
    
    if (!currentPos) return;

    let newX = currentPos.x;
    let newY = currentPos.y;

    switch (direction) {
      case 'up': newY--; break;
      case 'down': newY++; break;
      case 'left': newX--; break;
      case 'right': newX++; break;
      default: return;
    }

    const newPos = { x: newX, y: newY };
    
    // შევამოწმოთ არის თუ არა ახალი პოზიცია ვალიდური და არ ემთხვევა თუ არა მეორე პერსონაჟის პოზიციას
    if (isValidMove(newPos, mazes[currentMaze]) && 
        !(otherCharPos && newPos.x === otherCharPos.x && newPos.y === otherCharPos.y)) {
      
      if (selectedCharacter === 'char1') {
        setChar1Pos(newPos);
        // შევამოწმოთ მიაღწია თუ არა პირველმა პერსონაჟმა მიზანს
        if (newPos.x === target1Pos.x && newPos.y === target1Pos.y) {
          setChar1ReachedTarget(true);
          if (!char2ReachedTarget) {
            setSelectedCharacter('char2');
          }
        }
      } else {
        setChar2Pos(newPos);
        // შევამოწმოთ მიაღწია თუ არა მეორე პერსონაჟმა მიზანს
        if (newPos.x === target2Pos.x && newPos.y === target2Pos.y) {
          setChar2ReachedTarget(true);
          if (!char1ReachedTarget) {
            setSelectedCharacter('char1');
          }
        }
      }

      // შევამოწმოთ გაიმარჯვა თუ არა მოთამაშემ
      if ((selectedCharacter === 'char1' && char2ReachedTarget && newPos.x === target1Pos.x && newPos.y === target1Pos.y) ||
          (selectedCharacter === 'char2' && char1ReachedTarget && newPos.x === target2Pos.x && newPos.y === target2Pos.y)) {
        setGameWon(true);
        const timestamp = Date.now();
        updateGameProgress('labyrinth', timestamp, { taskIndex: currentMaze });
        setTimeout(() => {
          setCurrentMaze(prev => prev + 1);
          initPositions();
        }, 1500);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp' || event.key === 'w' || 
          event.key === 'ArrowDown' || event.key === 's' || 
          event.key === 'ArrowLeft' || event.key === 'a' || 
          event.key === 'ArrowRight' || event.key === 'd') {
        event.preventDefault();
      }
      
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
          moveCharacter('up');
          break;
        case 'ArrowDown':
        case 's':
          moveCharacter('down');
          break;
        case 'ArrowLeft':
        case 'a':
          moveCharacter('left');
          break;
        case 'ArrowRight':
        case 'd':
          moveCharacter('right');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveCharacter]);

  return (
    <GameContainer>
      <HomeButton />
      <Title>ლაბირინთი</Title>
      <Description>
        {currentCharacters.description}
        <div>
          <span className={`emoji-hint ${selectedCharacter === 'char1' ? 'active-character' : ''}`}>
            {currentCharacters.char1}
            <span>➡️</span>
            {currentCharacters.target1}
          </span>
          &nbsp;&nbsp;&nbsp;
          <span className={`emoji-hint ${selectedCharacter === 'char2' ? 'active-character' : ''}`}>
            {currentCharacters.char2}
            <span>➡️</span>
            {currentCharacters.target2}
          </span>
        </div>
      </Description>
      {gameWon && (
        <WinMessage>
          გილოცავთ! თქვენ გაიარეთ ყველა დონე! 🎉
        </WinMessage>
      )}
      <MazeContainer>
        {mazes[currentMaze]?.map((row, y) => (
          row.map((cell, x) => (
            <Cell
              key={`${x}-${y}`}
              isWall={cell === 1}
            >
              {(() => {
                // თუ პირველი პერსონაჟი დგას ამ უჯრაზე
                if (char1Pos && char1Pos.x === x && char1Pos.y === y) {
                  return currentCharacters?.char1;
                }
                // თუ მეორე პერსონაჟი დგას ამ უჯრაზე
                if (char2Pos && char2Pos.x === x && char2Pos.y === y) {
                  return currentCharacters?.char2;
                }
                // თუ პირველი სამიზნეა და პერსონაჟი არ დგას მასზე
                if (target1Pos && target1Pos.x === x && target1Pos.y === y &&
                    !(char1Pos && char1Pos.x === x && char1Pos.y === y)) {
                  return currentCharacters?.target1;
                }
                // თუ მეორე სამიზნეა და პერსონაჟი არ დგას მასზე
                if (target2Pos && target2Pos.x === x && target2Pos.y === y &&
                    !(char2Pos && char2Pos.x === x && char2Pos.y === y)) {
                  return currentCharacters?.target2;
                }
                return null;
              })()}
            </Cell>
          ))
        ))}
      </MazeContainer>
    </GameContainer>
  );
};

export default LabyrinthGame;