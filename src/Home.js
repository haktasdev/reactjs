import React from 'react';

const styles = {
  section: {
    minHeight: '100vh',
    padding: '80px 20px 40px',
    maxWidth: 900,
    margin: '0 auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#fff',
    lineHeight: 1.8,
    position: 'relative',
    zIndex: 2,
  },
  sectionOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
  sectionTitle: {
    fontSize: 38,
    marginBottom: 20,
    borderBottom: '3px solid #fff',
    paddingBottom: 10,
    color: '#fff',
    textShadow: '2px 2px 6px rgba(0,0,0,0.9)',
    position: 'relative',
    zIndex: 2,
  },
  paragraph: {
    fontSize: 18,
    color: '#fff',
    textShadow: '1px 1px 4px rgba(0,0,0,0.85)',
    position: 'relative',
    zIndex: 2,
    marginBottom: 16,
  },
  contactForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0 0 20px rgba(0,0,0,0.5)',
    color: 'white',
    position: 'relative',
    zIndex: 2,
  },
  input: {
    padding: 12,
    fontSize: 16,
    borderRadius: 6,
    border: 'none',
    outline: 'none',
    backgroundColor: 'rgba(255,255,255,0.25)',
    color: 'white',
  },
  textarea: {
    padding: 12,
    fontSize: 16,
    borderRadius: 6,
    border: 'none',
    outline: 'none',
    backgroundColor: 'rgba(255,255,255,0.25)',
    color: 'white',
    resize: 'vertical',
    minHeight: 120,
  },
  button: {
    padding: 14,
    backgroundColor: '#ffffff',
    border: 'none',
    color: '#333',
    fontSize: 18,
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  }
};

function Home() {
  return (
    <>
      <section
        style={{
          ...styles.section,
          backgroundImage: `url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1470&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div style={styles.sectionOverlay}></div>
        <h1 style={styles.sectionTitle}>Hoşgeldiniz!</h1>
        <p style={styles.paragraph}>
          Bu uygulamaya hoş geldiniz! Modern, şık ve hızlı bir React deneyimi sizi bekliyor.
        </p>
        <p style={styles.paragraph}>
          Burada şirketlerinizi yönetebilir, detayları görebilir ve iletişim kurabilirsiniz.
        </p>
      </section>

      <section
        style={{
          ...styles.section,
          backgroundImage: `url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1470&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div style={styles.sectionOverlay}></div>
        <h2 style={styles.sectionTitle}>Hakkımızda</h2>
        <p style={styles.paragraph}>
          Biz, modern yazılım çözümleri sunan genç ve dinamik bir ekibiz.
          Müşterilerimizin ihtiyaçlarını anlamak ve en iyi çözümü üretmek için çalışıyoruz.
        </p>
        <p style={styles.paragraph}>
          Teknoloji ve tasarımı harmanlayarak, kullanıcı dostu uygulamalar geliştiriyoruz.
          Amacımız sizin işinizi kolaylaştırmak.
        </p>
      </section>

      <section
        style={{
          ...styles.section,
          backgroundImage: `url('https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?auto=format&fit=crop&w=1470&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div style={styles.sectionOverlay}></div>
        <h2 style={styles.sectionTitle}>İletişim</h2>
        <form
          style={styles.contactForm}
          onSubmit={e => {
            e.preventDefault();
            alert('Mesajınız için teşekkürler! İletişime geçeceğiz.');
          }}
        >
          <input type="text" name="name" placeholder="Adınız" required style={styles.input} />
          <input type="email" name="email" placeholder="E-posta" required style={styles.input} />
          <textarea name="message" placeholder="Mesajınız" required style={styles.textarea}></textarea>
          <button type="submit" style={styles.button}>Gönder</button>
        </form>
      </section>
    </>
  );
}

export default Home;
