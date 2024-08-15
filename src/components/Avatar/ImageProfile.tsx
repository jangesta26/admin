import Image from 'next/image';
import styles from './ImageProfile.module.css';
interface IdProps {
  avatarUrl?: string | null;
}
const ImageProfile: React.FC<IdProps> = ({ avatarUrl }) => {
  return (
    <>
    <div className={styles.profileImageContainer}>
      <Image
        src={`${avatarUrl}`}
        alt="profile"
        layout="fill"
        objectFit="cover"
        unoptimized
      />
    </div>
    </>
  );
};

export default ImageProfile;
