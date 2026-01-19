# Todo Web App

แอปพลิเคชัน Todo แบบเต็มรูปแบบที่ใช้ Spring Boot (Backend) และ React (Frontend)

## 🚀 วิธีรัน

### Backend (Spring Boot)

1. เปิด Terminal และไปที่โฟลเดอร์ backend:
```bash
cd backend-java
```

2. รันโปรเจกต์:
```bash
./mvnw spring-boot:run
```
หรือบน Windows:
```bash
mvnw.cmd spring-boot:run
```

Backend จะรันที่ `http://localhost:8080`

### Frontend (React)

1. เปิด Terminal ใหม่และไปที่โฟลเดอร์ frontend:
```bash
cd frontend-react
```

2. ติดตั้ง dependencies (ครั้งแรกเท่านั้น):
```bash
npm install
```

3. รันโปรเจกต์:
```bash
npm run dev
```

Frontend จะรันที่ `http://localhost:5173`

## 📋 API Endpoints

- `GET /api/todos` - ดึงรายการ todo ทั้งหมด
- `GET /api/todos/{id}` - ดึง todo ตาม id
- `POST /api/todos` - สร้าง todo ใหม่
- `PUT /api/todos/{id}` - อัพเดท todo
- `DELETE /api/todos/{id}` - ลบ todo
- `PATCH /api/todos/{id}/toggle` - เปลี่ยนสถานะเสร็จ/ยังไม่เสร็จ

## 🛠 เทคโนโลยีที่ใช้

### Backend
- Spring Boot 3.5
- Spring Data JPA
- H2 Database (in-memory)
- Java 17

### Frontend
- React 19
- Vite
- Modern CSS

## 📦 Features

- ✅ เพิ่ม/ลบ/แก้ไข Todo
- ✅ ทำเครื่องหมายว่าเสร็จแล้ว
- ✅ กรองตามสถานะ (All/Active/Completed)
- ✅ แสดงสถิติ
- ✅ UI ที่สวยงาม Responsive

## 🔍 H2 Database Console

เข้าถึงฐานข้อมูลผ่าน: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:tododb`
- Username: `sa`
- Password: (ว่าง)
