import { shallowMount } from '@vue/test-utils'
import Card from '@/components/Card.vue'

describe('Card.vue', () => {
  describe('renders correct component when passing props text is true', () => {
    const props = {
      text: true,
      title: 'Cristiano Ronaldo',
      subtitle: 'Attacker',
      link: '/players/44'
    }
    let wrapper = null

    beforeEach(() => {
      wrapper = shallowMount(Card, {
        propsData: props
      })
    })

    it('should have class card and text when passing props text is true', () => {
      expect(wrapper.classes()).toContain('card')
      expect(wrapper.classes()).toContain('text')
      expect(wrapper.classes('card')).toBe(true)
      expect(wrapper.classes('text')).toBe(true)
    })

    it('renders correct element when passing props text true', () => {
      expect(wrapper.find('.card-title').text()).toMatch(props.title)
      expect(wrapper.find('.text-small').text()).toMatch(props.subtitle)
    })
  })

  describe('renders correct component when not passing props text', () => {
    const props = {
      title: 'Argentina',
      img: 'argentina.jpg',
      alt: 'argentina',
      link: 'teams/1'
    }
    let wrapper = null

    beforeEach(() => {
      wrapper = shallowMount(Card, {
        propsData: props
      })
    })

    it('should not have class text when not passing props text', () => {
      expect(wrapper.classes()).toContain('card')
      expect(wrapper.classes()).not.toContain('text')
      expect(wrapper.classes('card')).toBe(true)
      expect(wrapper.classes('text')).toBe(false)
    })

    it('renders correct element', () => {
      expect(wrapper.find('.card-title').text()).toMatch(props.title)
      expect(wrapper.find('.card-img').attributes('alt')).toMatch(props.alt)
      expect(wrapper.find('.card-img').attributes('src')).toMatch(props.img)
    })
  })
})
