import React from 'react'
import { noImg } from '../constants'

const Image = ({url, ...rest}) => {
  return (
    <img src={url || noImg} {...rest} onError={(e) => {e.target.src = noImg}}/>
  )
}

export default Image
