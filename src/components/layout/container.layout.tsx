export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col md:flex-row md:h-screen transition-all duration-500'>
      {children}
    </div>
  );
};
