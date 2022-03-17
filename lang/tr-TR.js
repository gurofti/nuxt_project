export default {
  // Validation
  form: {
    required: 'Bu alan gereklidir.',
    fill_in_form: 'Eksik alanları doldurunuz',
    confirmed: 'Bu {attribute} tekrarı eşleşmiyor.',
    invalid: 'Bu alan geçersiz.',
    email: 'E-Posta adresi geçersiz.',
    present: 'Bu alan mevcut olmalıdır.',
    regex: 'Bu biçim geçersiz.',
    min: {
      numeric: 'Bu alan değeri :min değerinden büyük olmalıdır.',
      string: 'Bu alan {min} karakterden büyük olmalıdır.',
      array: 'Bu alan en az :min nesneye sahip olmalıdır.',
    },
    max: {
      numeric: 'Bu alan değeri :max değerinden küçük olmalıdır.',
      file: 'Bu alan değeri :max kilobayt değerinden küçük olmalıdır.',
      string: 'Bu alan değeri :max karakterden küçük olmalıdır.',
      array: 'Bu alan değeri :max adedinden az nesneye sahip olmalıdır.',
    },
    error: 'Lütfen alanları eksiksiz doldurunuz.',
    success: 'Tebrikler! İşleminiz başarıyla gerçekleştirildi.',
    unexpected: 'Beklenmedik bir durum gerçekleşti.'
  },
  drag: {
    description: 'Yüklemek için dosyaları buraya sürükleyin veya tıklayın.',
    on_exceeded_title: 'Dosya boyutu sınırı aşılıyor.',
    on_exceeded_desc: '{filename} dosyası çok büyük, 100MB\'den fazla olamaz.',
    file_incorrect_title: 'Dosya biçimi yanlış.',
    file_incorrect_desc: '{filename} dosya biçimi yanlış, lütfen bu {format} formatlardan birini seçiniz.',
  },

  // Backend Message
  isNotFound: 'Bu değerlere sahip bir kayıt bulunamadı.',

  // Page Title
  allEducations: 'Tüm Eğitimler',
  educationCreate: 'Eğitim Oluştur',
  educationUpdate: 'Eğitim Güncelle',
  educationComments: 'Eğitim Yorumları',

  // Global Area
  fileUploaded: 'Dosya yükleme işlemi başarıyle gerçekleşti.',
  fileUploadError: 'Dosya yükleme işlemi sırasında beklenmeyen bir durum gerçekleşti.',


  // Keywords
  name: 'İsim',
  surname: 'Soyisim',
  login: 'Giriş',
  register: 'Kayıt Ol',
  username: 'Kullanıcı Adı',
  email: 'E-Posta',
  password: 'Şifre',
  confirmPassword: 'Şifre Tekrarı',
  action: 'İşlem',
  instructor: 'Eğitmen',
  update: 'Güncelle',
  delete: 'Sil',
  status: 'Durum',
  passive: 'Pasif',
  active: 'Aktif',
  outOfOrder: 'Devre Dışı',
  cancel: 'İptal',
  continue: 'Devam Et',
  waiting: 'Bekleyin...',
  creator: 'Oluşturan Kişi',
  send: 'Gönder',
  complete: 'Tamamlayın',
  writeAnswer: 'Cevap yaz...',
  commentSearch: 'Yorumları Ara...',
  commentsOrReplies: 'Yorumlar / Yanıtlar',

  // Login Page
  nAccountToRegister: 'Hesabın yok mu? Kayıt ol!',

  // Register Page
  hAccountAvailable: 'Zaten bir hesabın var mı? Giriş Yap',

  // Education
  educations: 'Eğitimler',
  educationTrainingName: 'Eğitim Kategori',
  educationName: 'Eğitim İsmi',
  educationDescription: 'Eğitim Açıklama',
  educationSearch: 'Eğitim Ara...',

  // Training
  eduTrainings: 'Kategoriler',
  eduTrainingCreate: 'Kategori Oluştur',
  eduTrainingName: 'Kategori Adı',
  eduTrainingStatus: 'Kategori Durumu',

  // Video
  videos: 'Videolar',
  videoSearch: 'Video ara...',
  videoCreate: 'Video Oluştur',
  videoUpdate: 'Video Güncele',
  videoSubCategory: 'Eğitim Alt Kategori',
  videoTitle: 'Video Başlığı',
  videoDescription: 'Video Açıklaması',
  videoListNo: 'Video Sıra Numarası',
  videoComments: 'Video Yorumları',

  // Question
  questions: 'Sorular',
  questionSearch: 'Soru ara...',
  questionCreate: 'Soru Oluştur',
  questionUpdate: 'Soru Güncelle',
  questionName: 'Soru Başlığı',
  questionType: 'Soru Şekli',
  queEducationVideo: 'Eğitim Videosu',
  questionListNo: 'Soru Sıra Numarası',
  questionStatus: 'Soru Durumu',
  questionComments: 'Video Yorumları',

  // Publisher
  publisherPosts: 'Paylaşımlar',
  publisherPostSearch: 'Paylaşım ara...',
  publisherPostCreate: 'Paylaşım Oluştur',
  publisherPostUpdate: 'Paylaşım Güncelle',
  publisherPostName: 'Paylaşım Başlığı',
  publisherPostType: 'Paylaşım Şekli',
  publisherPostListNo: 'Paylaşım Sıra Numarası',
  publisherPostStatus: 'Paylaşım Durumu',
  publisherPostComments: 'Paylaşım Yorumları',
  publisherPostContent: 'Paylaşım İçeriği',
}
