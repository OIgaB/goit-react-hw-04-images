import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 16px;
    padding-bottom: 24px;
`; 

export const StyledImage = styled.img`
    margin-left: auto;
    margin-right: auto;
    width: 500px;
    height: 500px;
    object-fit: cover;
`; 

export const Notification = styled.p`
    text-align: center;
    font-family: 'Playfair Display', serif;
    font-size: 25px;
    font-style: italic;
`; 