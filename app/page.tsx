'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Home() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 scanline opacity-50" />

      {/* Header */}
      <header className="bg-slate-950/80 backdrop-blur-xl border-b border-emerald-500/10 fixed top-0 w-full z-50">
        <nav className="flex justify-between items-center px-8 h-16 max-w-7xl mx-auto">
          <div className="text-xl font-bold text-primary tracking-widest font-headline">
            KINETIC_CONSOLE
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a className="font-headline uppercase tracking-tighter font-bold text-emerald-400 border-b-2 border-emerald-500 pb-1" href="#">PROJECTS</a>
            <a className="font-headline uppercase tracking-tighter font-bold text-slate-400 hover:text-emerald-300 transition-colors" href="#">STACK</a>
            <a className="font-headline uppercase tracking-tighter font-bold text-slate-400 hover:text-emerald-300 transition-colors" href="#">ARCHIVE</a>
            <a className="font-headline uppercase tracking-tighter font-bold text-slate-400 hover:text-emerald-300 transition-colors" href="#">CONTACT</a>
          </div>
          <Button variant="secondary" size="sm">DOWNLOAD_CV</Button>
        </nav>
      </header>

      <main className="flex-grow pt-24 pb-16 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
        {/* Page Title */}
        <section className="pt-8">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-2">{'//'} base_ui_components</h1>
          <p className="text-on-surface-variant">UI bileşenleri - Button, Card, Badge, Input, Textarea</p>
        </section>

        {/* Buttons Section */}
        <section>
          <h2 className="font-headline text-2xl font-bold mb-6 border-l-2 border-primary pl-4">Buttons</h2>
          
          {/* Variants */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Variants (5 tip)</CardTitle>
              <CardDescription>Primary, Secondary, Ghost, Destructive, Link</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </CardContent>
          </Card>

          {/* Sizes */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Sizes (4 boyut)</CardTitle>
              <CardDescription>Small, Medium, Large, Icon</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" aria-label="Icon Button">+</Button>
            </CardContent>
          </Card>

          {/* Loading & Disabled */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>States</CardTitle>
              <CardDescription>Loading (spinner ile) ve Disabled durumları</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Button loading>Yükleniyor...</Button>
              <Button disabled>Devre Dışı</Button>
            </CardContent>
          </Card>

          {/* With Icons */}
          <Card>
            <CardHeader>
              <CardTitle>With Icons</CardTitle>
              <CardDescription>Left ve Right icon desteği</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Button leftIcon={<span>←</span>}>Geri</Button>
              <Button rightIcon={<span>→</span>}>İleri</Button>
            </CardContent>
          </Card>
        </section>

        {/* Cards Section */}
        <section>
          <h2 className="font-headline text-2xl font-bold mb-6 border-l-2 border-primary pl-4">Cards</h2>
          
          {/* Variants */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Variants (3 tip)</CardTitle>
              <CardDescription>Default, Interactive, Featured</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card variant="default" padding="md">
                <h4 className="font-headline font-bold mb-2">Default Card</h4>
                <p className="text-sm text-on-surface-variant">Standart kart görünümü</p>
              </Card>
              <Card variant="interactive" padding="md">
                <h4 className="font-headline font-bold mb-2">Interactive Card</h4>
                <p className="text-sm text-on-surface-variant">Hover efekti ile</p>
              </Card>
              <Card variant="featured" padding="md">
                <h4 className="font-headline font-bold mb-2">Featured Card</h4>
                <p className="text-sm text-on-surface-variant">Öne çıkan kart</p>
              </Card>
            </CardContent>
          </Card>

          {/* Interactive Card with Hover */}
          <Card variant="interactive" hover padding="lg" className="cursor-pointer">
            <h3 className="font-headline text-xl font-bold mb-2">Sentinel Dashboard</h3>
            <p className="text-on-surface-variant mb-4">Real-time network security monitoring interface with 3D packet visualization.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="primary" size="sm">REACT</Badge>
              <Badge variant="secondary" size="sm">D3.JS</Badge>
            </div>
            <CardFooter className="pt-4">
              <Button variant="secondary" size="sm">{'//'} GitHub</Button>
              <Button size="sm">Demo →</Button>
            </CardFooter>
          </Card>
        </section>

        {/* Badges Section */}
        <section>
          <h2 className="font-headline text-2xl font-bold mb-6 border-l-2 border-primary pl-4">Badges</h2>
          
          {/* Variants */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Variants (7 tip)</CardTitle>
              <CardDescription>Default, Primary, Secondary, Accent, Success, Warning, Error</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Badge variant="default">Varsayılan</Badge>
              <Badge variant="primary">Birincil</Badge>
              <Badge variant="secondary">İkincil</Badge>
              <Badge variant="accent">Accent</Badge>
              <Badge variant="success">Başarılı</Badge>
              <Badge variant="warning">Uyarı</Badge>
              <Badge variant="error">Hata</Badge>
            </CardContent>
          </Card>

          {/* Sizes */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Sizes</CardTitle>
              <CardDescription>Small ve Medium</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-3">
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
            </CardContent>
          </Card>

          {/* Removable */}
          <Card>
            <CardHeader>
              <CardTitle>Removable</CardTitle>
              <CardDescription>X butonu ile kaldırılabilir</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Badge variant="primary" removable onRemove={() => {}}>React</Badge>
              <Badge variant="secondary" removable onRemove={() => {}}>TypeScript</Badge>
              <Badge variant="success" removable onRemove={() => {}}>Next.js</Badge>
            </CardContent>
          </Card>
        </section>

        {/* Inputs Section */}
        <section>
          <h2 className="font-headline text-2xl font-bold mb-6 border-l-2 border-primary pl-4">Inputs</h2>
          
          {/* Basic */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Types</CardTitle>
              <CardDescription>Text, Email, Password, vb.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input type="text" placeholder="Adınızı girin" />
              <Input type="email" placeholder="ornek@email.com" />
              <Input type="password" placeholder="Şifreniz" />
            </CardContent>
          </Card>

          {/* Sizes */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Sizes</CardTitle>
              <CardDescription>Small, Medium, Large</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input inputSize="sm" placeholder="Küçük input" />
              <Input inputSize="md" placeholder="Orta input" />
              <Input inputSize="lg" placeholder="Büyük input" />
            </CardContent>
          </Card>

          {/* Error State */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Error State</CardTitle>
              <CardDescription>Validation error gösterimi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input 
                type="email" 
                placeholder="Email adresi"
                error
                errorMessage="Geçerli bir email adresi giriniz"
                id="email-error"
              />
              <Input 
                type="text"
                placeholder="Zorunlu alan"
                error
                errorMessage="Bu alan boş bırakılamaz"
                id="required-error"
              />
            </CardContent>
          </Card>

          {/* With Icons */}
          <Card>
            <CardHeader>
              <CardTitle>With Icons</CardTitle>
              <CardDescription>Sol ve sağ ikon desteği</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input 
                type="search"
                placeholder="Ara..." 
                leftIcon={<span>🔍</span>}
              />
              <Input 
                type="text"
                placeholder="Kullanıcı adı"
                rightIcon={<span>@</span>}
              />
            </CardContent>
          </Card>
        </section>

        {/* Textarea Section */}
        <section>
          <h2 className="font-headline text-2xl font-bold mb-6 border-l-2 border-primary pl-4">Textarea</h2>
          
          {/* Basic */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Basic</CardTitle>
              <CardDescription>Standart textarea</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="Mesajınızı buraya yazın..." />
            </CardContent>
          </Card>

          {/* Character Count */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Character Count</CardTitle>
              <CardDescription>maxLength ve showCount ile karakter sayımı</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="En fazla 200 karakter..."
                maxLength={200}
                showCount
              />
            </CardContent>
          </Card>

          {/* Error State */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Error State</CardTitle>
              <CardDescription>Validation error gösterimi</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Mesaj"
                error
                errorMessage="Mesaj en az 20 karakter olmalıdır"
                id="message-error"
              />
            </CardContent>
          </Card>

          {/* Auto Resize */}
          <Card>
            <CardHeader>
              <CardTitle>Auto Resize</CardTitle>
              <CardDescription>İçerikle birlikte otomatik boyutlanma</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Yazdıkça büyür..."
                autoResize
              />
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-emerald-500/10 py-12">
        <div className="flex flex-col justify-between items-center px-8 max-w-7xl mx-auto gap-4">
          <div className="text-slate-500 font-label text-sm">
            © 2026 Hikmet Güleşli. Tüm hakları saklıdır.
          </div>
          <div className="flex gap-6">
            <a className="text-slate-400 hover:text-primary transition-colors font-label text-sm" href="#">GitHub</a>
            <a className="text-slate-400 hover:text-primary transition-colors font-label text-sm" href="#">LinkedIn</a>
            <a className="text-slate-400 hover:text-primary transition-colors font-label text-sm" href="#">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
