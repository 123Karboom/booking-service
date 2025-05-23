const Category = require('../models/Category');

const categoryData = [
  {
    _id: "cat001",
    name: "Manicure",
    description: "Các dịch vụ chăm sóc và làm đẹp móng tay",
    image: "manicure.jpg",
    is_popular: true,
    display_order: 1,
    services: []
  }, 
  {
    _id: "cat002",
    name: "Hair",
    description: "Các dịch vụ cắt, nhuộm và tạo kiểu tóc",
    image: "hair.jpg",
    is_popular: true,
    display_order: 2,
    services: []
  }, {
    _id: "cat003",
    name: "Face",
    description: "Các dịch vụ chăm sóc và điều trị da mặt",
    image: "face.jpg",
    is_popular: true,
    display_order: 3,
    services: []
  },
]