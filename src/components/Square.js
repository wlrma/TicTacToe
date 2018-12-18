import React from 'react'
import './Square.css'

export default function Square(props) {
  const value = props.value;
  let style = 'base-square';
  if (value && value === 'O') {
    style += ' square-o';
  } else if (value && value === 'X') {
    style += ' square-x';
  }

  return (
    <button className={style} onClick={() => props.onClick()}>
      { props.value }
    </button>
  )
}
