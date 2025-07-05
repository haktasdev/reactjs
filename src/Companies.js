import React, { useEffect, useState } from 'react';

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    yearEstablished: ''
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = () => {
    fetch('http://localhost:8080/api/companies')
      .then(res => {
        if (!res.ok) throw new Error('Network response not ok');
        return res.json();
      })
      .then(data => setCompanies(data))
      .catch(err => console.error('Fetch error:', err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.address || !formData.yearEstablished) {
      alert('Lütfen tüm alanları doldurun!');
      return;
    }

    const method = editingCompany ? 'PUT' : 'POST';
    const url = editingCompany
      ? `http://localhost:8080/api/companies/${editingCompany.id}`
      : 'http://localhost:8080/api/companies';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        address: formData.address,
        yearEstablished: parseInt(formData.yearEstablished, 10),
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Request failed');
        return res.json();
      })
      .then(savedCompany => {
        if (editingCompany) {
          setCompanies(prev => prev.map(c => c.id === savedCompany.id ? savedCompany : c));
        } else {
          setCompanies(prev => [...prev, savedCompany]);
        }
        setShowModal(false);
        setEditingCompany(null);
        setFormData({ name: '', address: '', yearEstablished: '' });
      })
      .catch(err => alert('Bir hata oluştu: ' + err.message));
  };

  const handleDelete = (id) => {
    if (!window.confirm('Bu şirketi silmek istediğinize emin misiniz?')) return;

    fetch(`http://localhost:8080/api/companies/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) throw new Error('Delete failed');
        setCompanies(prev => prev.filter(c => c.id !== id));
      })
      .catch(err => alert('Bir hata oluştu: ' + err.message));
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    setFormData({
      name: company.name,
      address: company.address,
      yearEstablished: company.yearEstablished.toString(),
    });
    setShowModal(true);
  };

  const handleDragStart = (e, company) => {
    setDraggedItem(company);
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetCompany) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === targetCompany.id) return;

    const draggedIndex = companies.findIndex(c => c.id === draggedItem.id);
    const targetIndex = companies.findIndex(c => c.id === targetCompany.id);

    const newItems = [...companies];
    newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, draggedItem);

    setCompanies(newItems);
    e.currentTarget.style.opacity = '1';
    setDraggedItem(null);
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Merve seni çok seviyorum KALP</h1>

      <button
        onClick={() => {
          setEditingCompany(null);
          setFormData({ name: '', address: '', yearEstablished: '' });
          setShowModal(true);
        }}
        style={{
          marginBottom: 20,
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Şirket Ekle
      </button>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {companies.map(company => (
          <li
            key={company.id}
            draggable
            onDragStart={(e) => handleDragStart(e, company)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, company)}
            style={{
              backgroundColor: draggedItem?.id === company.id ? '#e0e0e0' : '#f9f9f9',
              marginBottom: 15,
              padding: 15,
              borderRadius: 8,
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'grab',
              transition: 'background-color 0.3s',
            }}
          >
            <div>
              <h2>{company.name}</h2>
              <p><b>Address:</b> {company.address}</p>
              <p><b>Established:</b> {company.yearEstablished}</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(company);
                }}
                style={{
                  cursor: 'pointer',
                  fontSize: 20,
                  backgroundColor: 'transparent',
                  border: 'none',
                }}
                title="Düzenle"
              >
                ✏️
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(company.id);
                }}
                style={{
                  cursor: 'pointer',
                  fontSize: 20,
                  backgroundColor: 'transparent',
                  border: 'none',
                }}
                title="Sil"
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>

      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          onClick={() => {
            setShowModal(false);
            setEditingCompany(null);
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: 30,
              borderRadius: 10,
              width: '90%',
              maxWidth: 400,
              position: 'relative',
            }}
            onClick={e => e.stopPropagation()}
          >
            <h2>{editingCompany ? 'Şirket Düzenle' : 'Yeni Şirket Ekle'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
              <input
                type="text"
                name="name"
                placeholder="Şirket Adı"
                value={formData.name}
                onChange={handleChange}
                required
                style={{ padding: 10, fontSize: 16, borderRadius: 5, border: '1px solid #ccc' }}
              />
              <input
                type="text"
                name="address"
                placeholder="Adres"
                value={formData.address}
                onChange={handleChange}
                required
                style={{ padding: 10, fontSize: 16, borderRadius: 5, border: '1px solid #ccc' }}
              />
              <input
                type="number"
                name="yearEstablished"
                placeholder="Kuruluş Yılı"
                value={formData.yearEstablished}
                onChange={handleChange}
                required
                min={1800}
                max={new Date().getFullYear()}
                style={{ padding: 10, fontSize: 16, borderRadius: 5, border: '1px solid #ccc' }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingCompany(null);
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#ccc',
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer',
                  }}
                >
                  İptal
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  {editingCompany ? 'Güncelle' : 'Ekle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Companies;