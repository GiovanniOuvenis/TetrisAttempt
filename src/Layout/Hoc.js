import React from 'react'
import { Component } from 'react/cjs/react.production.min'
import { Block } from '../Pieces/Block/Block';

const Hoc = Component = ({props}) => {
    return (
        <Component {...props}></Component>
    )
}

const BlockFromHoc = Hoc(Block);

export { BlockFromHoc, Hoc};