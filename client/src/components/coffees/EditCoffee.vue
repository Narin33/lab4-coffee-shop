<template>
  <div>
    <h1>Edit Coffee</h1>

    <!-- แสดงฟอร์มเมื่อโหลดข้อมูลมาแล้ว -->
    <div v-if="coffee">

      <p>
        Name:
        <input v-model="coffee.name" type="text" />
      </p>

      <p>
        Price:
        <input v-model="coffee.price" type="number" />
      </p>

      <p>
        Type:
        <select v-model="coffee.type">
          <option value="hot">hot</option>
          <option value="iced">iced</option>
          <option value="frappe">frappe</option>
        </select>
      </p>

      <p>
        Description:
        <textarea v-model="coffee.description"></textarea>
      </p>

      <!-- แสดงรูปเดิม -->
      <div v-if="coffee.image && coffee.image !== 'null' && !previewImage">
        <p>รูปเดิม:</p>
        <img
          :src="getImageUrl(coffee.image)"
          width="200"
        />
      </div>

      <!-- เลือกรูปใหม่ -->
      <div style="margin-top:10px;">
        <label>อัปโหลดรูปใหม่ (ถ้าต้องการเปลี่ยน)</label><br />
        <input type="file" @change="onFileChange" accept="image/*" />
      </div>

      <!-- Preview รูปใหม่ -->
      <div v-if="previewImage" style="margin-top:10px;">
        <p>Preview รูปใหม่:</p>
        <img :src="previewImage" width="200" />
      </div>

      <br />

      <button @click="updateCoffee">บันทึกการแก้ไข</button>
      <button @click="navigateTo('/coffees')">ยกเลิก</button>

    </div>

    <!-- ระหว่างโหลดข้อมูล -->
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
import CoffeesService from '../../services/CoffeesService'
import CoffeeUploadService from '../../services/CoffeeUploadService'

export default {
  data () {
    return {
      coffee: null,
      selectedFile: null,
      previewImage: null
    }
  },

  async created () {
    const coffeeId = this.$route.params.coffeeId
    this.coffee = (await CoffeesService.show(coffeeId)).data
  },

  methods: {

    // แสดง URL รูป
    getImageUrl (filename) {
      return 'http://localhost:8081/assets/coffee/' + filename
    },

    // เมื่อเลือกรูปใหม่
    onFileChange (event) {
      const file = event.target.files[0]
      if (!file) return

      this.selectedFile = file
      this.previewImage = URL.createObjectURL(file)
    },

    async updateCoffee () {
      try {

        // ถ้ามีเลือกรูปใหม่ → อัปโหลดก่อน
        if (this.selectedFile) {
          const formData = new FormData()
          formData.append('image', this.selectedFile)

          const response = await CoffeeUploadService.upload(formData)
          this.coffee.image = response.data.filename
        }

        // ส่งข้อมูลไปอัปเดต
        await CoffeesService.put(this.coffee)

        alert('แก้ไขข้อมูลเรียบร้อย')
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