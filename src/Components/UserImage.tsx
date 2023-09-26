import Image from 'next/image';

export default function UserImage({
  image,
  className = '',
}: {
  image?: string | null;
  className?: string;
}) {
  return (
    <div className={`relative h-10 w-10 ${className}`}>
      <Image
        src={image || '/profile.jpg'}
        alt='UserImage'
        className='absolute rounded-full'
        fill
      />
    </div>
  );
}
