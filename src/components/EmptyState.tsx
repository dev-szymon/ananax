import Link from 'next/link';

export default function EmptyState() {
  return (
    <>
      <h3>looks like nothing's here...</h3>
      <div>
        <Link href="/recipes">all recipes</Link>
      </div>
      <div>
        <Link href="/ingredients">all ingredients</Link>
      </div>
    </>
  );
}
