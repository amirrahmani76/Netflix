import cls from 'classnames';

import styles from './section-cards.module.css';
import Card from './card';
import Link from 'next/link';

const SectionCards = ({ title, videos, size }) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={cls(styles.cardWrapper, styles.scrollbar)}>
        {videos.map((video, idx) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <Link href={`/video/`}>
              <a>
                <Card key={idx} id={idx} imgUrl={video.imgUrl} size={size} />
              </a>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SectionCards;
