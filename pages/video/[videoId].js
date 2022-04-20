import { useRouter } from 'next/router';
import Modal from 'react-modal';
import cls from 'classnames';

import styles from '../../styles/Video.module.css';
import { getYoutubeVideoById } from '../../lib/videos';
import Navbar from '../../components/nav/navbar';

// It is important for users of screenreaders that other page content be hidden (via the aria-hidden attribute) while the modal is open
Modal.setAppElement('#__next');

export async function getStaticProps(context) {
  const videoId = context.params.videoId;
  const videoArray = await getYoutubeVideoById(videoId);

  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {},
    },

    revalidate: 10, // In seconds
  };
}

export async function getStaticPaths() {
  const listOfVideos = ['4zH5iYM4wJo&t', 'zb1vnDhNj6A', 'mYfJxlgR2jw'];

  const paths = listOfVideos.map((videoId) => ({
    params: { videoId },
  }));

  return { paths, fallback: 'blocking' };
}

const Video = ({ video }) => {
  const router = useRouter();
  const vidId = router.query.videoId;

  const {
    title,
    publishTime,
    description,
    channelTitle,
    statistics: { viewCount } = { viewCount: 0 },
  } = video;

  return (
    <div>
      <Navbar />

      <Modal
        className={styles.modal}
        isOpen={true}
        contentLabel="watch the video"
        onRequestClose={() => router.back()}
        overlayClassName={styles.overlay}
      >
        <iframe
          id="ytplayer"
          className={styles.videoPlayer}
          type="text/html"
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/${vidId}?autoplay=0&origin=http://example.com&controls=0&rel=0`}
          frameBorder="0"
        ></iframe>

        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={cls(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={cls(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
