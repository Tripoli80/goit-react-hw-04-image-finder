import styled from '@emotion/styled'


const ImageGalleryContainer =styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
    
`

const NoImage= styled.div`
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  padding: 15px;
  font-size: 27px;
  font-weight: 700;

`

export {ImageGalleryContainer, NoImage}