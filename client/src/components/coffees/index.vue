<template>
  <div class="coffee-container">
    <div class="header-actions">
      <h2>☕ เมนูกาแฟทั้งหมด ({{ coffees.length }})</h2>
      <button class="btn btn-create" v-on:click="navigateTo('/coffee/create')">
        + เพิ่มเมนูใหม่
      </button>
    </div>

    <div v-if="coffees.length > 0" class="coffee-grid">
      <div v-for="coffee in coffees" :key="coffee.id" class="coffee-card">

        <!-- รูปกาแฟ (วงกลม) -->
        <div class="coffee-image-wrapper">
          <img
            v-if="coffee.image && coffee.image !== 'null'"
            :src="getImageUrl(coffee.image)"
            class="coffee-image"
          />
          <div v-else class="coffee-icon">
            <span v-if="coffee.type === 'hot'">☕</span>
            <span v-else>🥤</span>
          </div>
        </div>

        <div class="coffee-info">
          <h3>{{ coffee.name }}</h3>
          <p class="price">{{ coffee.price }} บาท</p>
          <span :class="'badge ' + (coffee.type === 'hot' ? 'badge-hot' : 'badge-iced')">
            {{ coffee.type === 'hot' ? 'ร้อน' : 'เย็น/ปั่น' }}
          </span>
          <p class="desc">{{ coffee.description }}</p>
        </div>

        <div class="coffee-actions">
          <button class="btn btn-sm btn-view" v-on:click="navigateTo('/coffee/' + coffee.id)">ดู</button>
          <button class="btn btn-sm btn-edit" v-on:click="navigateTo('/coffee/edit/' + coffee.id)">แก้ไข</button>
          <button class="btn btn-sm btn-delete" v-on:click="deleteCoffee(coffee)">ลบ</button>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <p>... ยังไม่มีเมนูกาแฟ ...</p>
    </div>
  </div>
</template>

<script>
import CoffeesService from '../../services/CoffeesService'

export default {
  data() {
    return {
      coffees: []
    }
  },
  async created() {
    try {
      this.coffees = (await CoffeesService.index()).data
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route)
    },
    getImageUrl(filename) {
      return 'http://localhost:8081/assets/coffee/' + filename
    },
    async deleteCoffee(coffee) {
      if (confirm("คุณต้องการลบเมนู " + coffee.name + " ใช่ไหม?")) {
        try {
          await CoffeesService.delete(coffee.id)
          this.coffees = (await CoffeesService.index()).data
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
}
</script>

<style scoped>
.coffee-container {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}

.coffee-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.coffee-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  text-align: center;
  border: 1px solid #eee;
}

.coffee-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0,0,0,0.1);
}

/* ===== รูปวงกลม ===== */
.coffee-image-wrapper {
  margin-bottom: 15px;
}

.coffee-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;      /* วงกลม */
  object-fit: cover;       /* ครอบภาพให้พอดี */
  border: 3px solid #f0f0f0;
}

/* ถ้าไม่มีรูป */
.coffee-icon {
  font-size: 50px;
}

.coffee-info h3 {
  margin: 10px 0 5px;
  color: #333;
}

.price {
  font-size: 18px;
  font-weight: bold;
  color: #28a745;
  margin: 5px 0;
}

.desc {
  font-size: 13px;
  color: #777;
  margin-top: 10px;
  min-height: 40px;
}

.badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}
.badge-hot { background-color: #ffebee; color: #c62828; }
.badge-iced { background-color: #e3f2fd; color: #1565c0; }

.coffee-actions {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  gap: 5px;
}

.btn {
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s;
}

.btn-create {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  font-weight: bold;
}

.btn-sm { padding: 6px 12px; font-size: 12px; }

.btn-view { background-color: #17a2b8; color: white; }
.btn-edit { background-color: #ffc107; color: black; }
.btn-delete { background-color: #dc3545; color: white; }

.btn:hover { opacity: 0.8; }

.empty-state { text-align: center; color: #999; margin-top: 50px; }
</style>