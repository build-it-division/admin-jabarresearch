import React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../store';

const Question = () => {
    const InsightState = useSelector((state: RootStore) => state.insight);
    console.log('ini data ',InsightState);
  return (
    <div>Question</div>
  );
};

export default Question;