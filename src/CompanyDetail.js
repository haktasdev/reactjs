import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function CompanyDetail() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/api/companies/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Network response not ok');
        return res.json();
      })
      .then(data => {
        setCompany(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Yükleniyor...</p>;
  if (!company) return <p>Şirket bulunamadı.</p>;

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>{company.name}</h1>
      <p><b>Adres:</b> {company.address}</p>
      <p><b>Kuruluş Yılı:</b> {company.yearEstablished}</p>

      <Link to="/companies" style={{ display: 'inline-block', marginTop: 20 }}>
        ← Şirketler Listesine Dön
      </Link>
    </div>
  );
}

export default CompanyDetail;
