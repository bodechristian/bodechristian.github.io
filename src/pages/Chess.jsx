import React from 'react';
import ChessBoard from '../components/ChessBoard';

const Chess = () => {
  return (
    <div className='flex-center'>
      <h1 className='mb-3'>Chess</h1>
      <ChessBoard></ChessBoard>
    </div>
  );
};
export default Chess;