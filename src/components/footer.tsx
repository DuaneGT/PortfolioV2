export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-6 border-t bg-muted/40">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>&copy; {currentYear} Veridian Portfolio. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
