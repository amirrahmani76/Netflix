import { useRouter } from 'next/router';
import Modal from 'react-modal';

import styles from '../../styles/Video.module.css';

// It is important for users of screenreaders that other page content be hidden (via the aria-hidden attribute) while the modal is open
Modal.setAppElement('#__next');

const Video = () => {
  const router = useRouter();
  const vidId = router.query.videoId;
  return (
    <div className={styles.container}>
      {/* <Modal
        className={styles.modal}
        isOpen={true}
        contentLabel="watch the video"
        onRequestClose={() => router.back()}
        overlayClassName={styles.overlay}
      >
        <iframe
          id="ytplayer"
          type="text/html"
          width="640"
          height="360"
          src={`https://www.youtube.com/embed/${vidId}?autoplay=0&origin=http://example.com&controls=0&rel=0`}
          frameBorder="0"
        ></iframe>
      </Modal> */}
    </div>
  );
};

export default Video;
