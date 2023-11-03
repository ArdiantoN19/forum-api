# forum-api
This Api to complete first submission from Dicoding at class Menjadi Back-End Developer Expert

Aplikasi ini merupakan sebuah aplikasi yang menyediakan endpoint yang dapat digunakan oleh client atau sisi frontend. Aplikasi ini dibangun dengan menerapkan culture ```TDD (Test Driven Development)``` yang dimana kita membuat test case terlebih dahulu sebelum menuliskan kode fungsi dari aplikasi. Telah menerapkan ```Unit Testing dan Integration Test```. Aplikasi ini dibangun dengan menerapkan konsep dari ``` Clean Architecture ```, yang dimana source code terdiri dari 4 layer yaitu:
- Entities, sebagai tempat penyimpanan data entitas bisnis utama. Dibuat untuk mengelola struktur data yang kompleks.
- Use Case, digunakan sebagai tempat menuliskannya flow atau alur bisnis logika.
- Interface Adapter (Repository dan Handler), sebagai mediator atau penghubung antara layer framework dengan layer use case.
- Frameworks (Database dan HTTP server), merupakan level paling luar merupakan bagian yang berhubungan dengan framework.

  
Berikut merupakan beberapa fitur yang terdapat didalamnya:
- Registrasi Pengguna
- Login
- Refresh Access Token
- Logout
- Menambahkan Thread
- Menambahkan Komentar pada Thread
- Menghapus Komentar pada Thread
- Melihat Detail Thread
- Menambah Balasan pada Komentar Thread
- Menghapus Balasan pada Komentar Thread


Semoga kode ini bermanfaat. Terima kasih 🙂
