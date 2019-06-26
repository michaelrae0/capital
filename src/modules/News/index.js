import React from 'react'
import { graphql } from 'gatsby'
import propTypes from 'prop-types'
import classnames from 'classnames'

import NewsArticle from '../../components/NewsArticle'
import Container from '../../components/Container'
import Row from '../../components/Row'
import { H1, H3 } from '../../components/Typography'
import LoadArrowSVG from '../../images/svg/LoadArrow.svg'

import * as news from './news.module.scss'

const PER_PAGE = 6;

export default class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canLoadMore: true,
      itemsShowing: PER_PAGE,
    }
  }

  static propTypes = {
    title: propTypes.string,
    newsItems: propTypes.array,
  }

  static defaultProps = {
    title: 'News',
    newsItems: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(id => (
      {
        title: 'Emerald Asset Management and 1251 Capital Group Complete Partnership Transaction',
        publishDate: '2018-02-08T00:00-04:00'
      }
    ))
  }

  componentDidMount() {
    if (this.state.itemsShowing >= this.props.newsItems.length) {
      this.setState({ canLoadMore: false })
    }
  }

  handleOnClick = () => {
    this.setState({ itemsShowing: this.state.itemsShowing + PER_PAGE });

    if (this.state.itemsShowing + PER_PAGE >= this.props.newsItems.length) {
      this.setState({ canLoadMore: false })
    }
  }
  
  render() {
    const { title, newsItems } = this.props;
    const { canLoadMore, itemsShowing } = this.state;

    return (
      <div>
        <section className={news.section}>
          <Container>
            <Row className={news.title_row} >
              <H1 text={title} className={news.title} />
            </Row>
            <Row wrap>
              {
                newsItems
                  .slice(0, itemsShowing)
                  .map(item => <NewsArticle {...item} key={item.slug} className={news.fade_in_bottom_delay} />)
              }
            </Row>
            <Row>
              {canLoadMore && 
              <div className={classnames(news.load_more)} onClick={this.handleOnClick} >
                <H3 text={'Load More'} bold /><LoadArrowSVG className={news.load_arrow} key={19} />
              </div>}
            </Row>
          </Container>
        </section>
      </div>
    )
  }
}

export const query = graphql`
  fragment News on ContentfulModuleNews {
    id
    title
    slug
    newsItems {
      title
      slug
      url
      publishDate         
    }
  }
`