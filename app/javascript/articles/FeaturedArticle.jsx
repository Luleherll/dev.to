import { h } from 'preact';
import PropTypes from 'prop-types';
import {
  TagList,
  SaveButton,
  ReadingTime,
  ReactionsCount,
  CommentsCount,
} from './components';
import { articlePropTypes } from '../src/components/common-prop-types';

// TODO: cloud_cover_url
const cloud_cover_url = url => url; // eslint-disable-line camelcase

export const FeaturedArticle = ({
  article,
  isBookmarked,
  reactionsIcon,
  commentsIcon,
}) => {
  return (
    <div>
      <div
        id="featured-story-marker"
        data-featured-article={`articles-${article.id}`}
      />
      <img
        src={cloud_cover_url(article.main_image)}
        style={{ display: 'none' }}
        alt={article.title}
      />
      <a
        href={article.path}
        id={`article-link-${article.id}`}
        className="index-article-link"
        aria-label="Main Story"
        data-featured-article={`articles-${article.id}`}
      >
        <div
          className="single-article big-article"
          data-content-user-id={article.user_id}
        >
          <div
            className="picture image-final"
            style={{
              backgroundColor: article.main_image_background_hex_color,
              backgroundImage: `url(${cloud_cover_url(article.main_image)})`,
            }}
          />
          <div className="content-wrapper">
            <h3>{article.title}</h3>
          </div>
          <a
            href="/<%= article.cached_user.username %>"
            className="featured-profile-button"
          >
            <img
              className="featured-profile-pic"
              src={article.user.profile_image_90}
              alt="<%= article.title %>"
            />
          </a>
          <div className="featured-user-name">
            <a href="/<%= article.cached_user.username %>">
              {article.user.name}
              {' '}
              {`render "shared/pro_checkmark" if
              article.cached_user.pro`}
              ・
              <time dateTime={article.published_timestamp}>
                {article.readable_publish_date}
              </time>
              <span
                className="time-ago-indicator-initial-placeholder"
                data-seconds="<%= article.published_at_int %>"
              />
            </a>
          </div>
          <TagList tags={article.tag_list} className="featured-tags" />
          <CommentsCount
            count={article.comments_count}
            articlePath={article.path}
            icon={commentsIcon}
            className="featured-engagement-count"
          />
          <ReactionsCount article={article} icon={reactionsIcon} />
          <ReadingTime
            articlePath={article.path}
            readingTime={article.reading_time}
          />
          <SaveButton article={article} isBookmarked={isBookmarked} />
        </div>
      </a>
    </div>
  );
};

FeaturedArticle.defaultProps = {
  isBookmarked: false,
};

FeaturedArticle.propTypes = {
  article: articlePropTypes.isRequired,
  isBookmarked: PropTypes.bool,
  reactionsIcon: PropTypes.string.isRequired,
  commentsIcon: PropTypes.string.isRequired,
};
