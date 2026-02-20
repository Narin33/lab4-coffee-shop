<template>
  <div>
    <h1>Create Coffee</h1>

    <form @submit.prevent="createCoffee">

      <!-- ชื่อเมนู -->
      <div>
        <label>ชื่อเมนู</label><br />
        <input v-model="coffee.name" type="text" required />
      </div>

      <!-- ราคา -->
      <div>
        <label>ราคา</label><br />
        <input v-model.number="coffee.price" type="number" required />
      </div>

      <!-- ประเภท -->
      <div>
        <label>ประเภท</label><br />
        <select v-model="coffee.type" required>
          <option value="">-- เลือกประเภท --</option>
          <option value="hot">Hot</option>
          <option value="iced">Iced</option>
          <option value="frappe">Frappe</option>
        </select>
      </div>

      <!-- รายละเอียด -->
      <div>
        <label>รายละเอียด</label><br />
        <textarea v-model="coffee.description"></textarea>
      </div>

      <!-- อัปโหลดรูป -->
      <div>
        <label>รูปภาพเมนู</label><br />
        <input type="file" @change="onFileChange" accept="image/*" />
      </div>

      <!-- Preview -->
      <div v-if="previewImage" style="margin-top:10px;">
        <p>Preview:</p>
        <img :src="previewImage" width="200" />
      </div>

      <br />

      <button type="submit">บันทึกเมนู</button>
      <button type="button" @click="navigateTo('/coffees')">
        ยกเลิก
      </button>
    </form>
  </div>
</template>

<script>
import CoffeesService from '../../services/CoffeesService'
import CoffeeUploadService from '../../services/CoffeeUploadService'

export default {
  data () {
    return {
      coffee: {
        name: '',
        price: null,
        type: '',
        description: '',
        image: 'null'
      },
      selectedFile: null,
      previewImage: null
    }
  },
  methods: {

    // เมื่อเลือกไฟล์
    onFileChange (event) {
      const file = event.target.files[0]
      if (!file) return

      this.selectedFile = file

      // Preview รูป
      this.previewImage = URL.createObjectURL(file)
    },

    async createCoffee () {
      try {

        // ถ้ามีรูป → อัปโหลดก่อน
        if (this.selectedFile) {
          const formData = new FormData()
          formData.append('image', this.selectedFile)

          const response = await CoffeeUploadService.upload(formData)
          this.coffee.image = response.data.filename
        }

        // บันทึกข้อมูลกาแฟ
        await CoffeesService.post(this.coffee)

        alert('เพิ่มเมนูกาแฟเรียบร้อย')
        this.$router.push('/coffees')

      } catch (err) {
        console.log(err)
        alert('เกิดข้อผิดพลาด')
      }
    },

    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>