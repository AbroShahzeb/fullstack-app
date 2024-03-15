function BlobAnimation() {
  return (
    <>
      <div className="absolute top-0 -left-20 hidden sm:block w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply  animate-blob blur-xl "></div>
      <div className="absolute top-0 -right-4 w-96 h-96  hidden sm:block bg-yellow-300 rounded-full mix-blend-multiply  animate-blob animation-delay-2000 blur-xl"></div>
      <div className="absolute left-20 top-8 w-96 h-96  hidden sm:block bg-pink-300 rounded-full mix-blend-multiply  animate-blob animation-delay-4000 blur-xl"></div>
    </>
  );
}

export default BlobAnimation;
