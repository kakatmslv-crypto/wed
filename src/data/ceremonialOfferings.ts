export type FruitTrayGroup = 'prosperity' | 'abundance' | 'sweetness' | 'heritage';

export interface CeremonialFruit {
  id: number;
  nameKh: string;
  nameEn: string;
  meaningKh: string;
  meaningEn: string;
  group: FruitTrayGroup;
}

export interface RoyalTrayItem {
  id: string;
  titleKh: string;
  titleEn: string;
  detailKh: string;
  detailEn: string;
}

export interface DressSwatch {
  id: string;
  hex: string;
  nameKh: string;
  nameEn: string;
  noteKh: string;
  noteEn: string;
}

export interface ClassicBlessing {
  id: string;
  titleKh: string;
  titleEn: string;
  textKh: string;
  textEn: string;
}

export const THIRTY_SIX_FRUITS: CeremonialFruit[] = [
  // Group 1: Prosperity & Harmony (សិរីសួស្តី និងភាពត្រជាក់ត្រជំ) - 9 items
  { id: 1, nameKh: 'ដូងខ្ចី', nameEn: 'Young Coconut', meaningKh: 'ភាពត្រជាក់ត្រជំ បរិសុទ្ធ', meaningEn: 'Cool harmony & purity', group: 'prosperity' },
  { id: 2, nameKh: 'ចេកណាំវ៉ា', nameEn: 'Nam Wa Banana', meaningKh: 'សាមគ្គីភាព កូនចៅហូរហែ', meaningEn: 'Family unity & lineage', group: 'prosperity' },
  { id: 3, nameKh: 'ចេកនួន', nameEn: 'Lady Finger Banana', meaningKh: 'ជីវិតរលូន ថ្កុំថ្កើង', meaningEn: 'Smooth & radiant life', group: 'prosperity' },
  { id: 4, nameKh: 'ស្វាយទុំ', nameEn: 'Ripe Golden Mango', meaningKh: 'សុភមង្គល ភ្លឺថ្លា', meaningEn: 'Golden happiness', group: 'prosperity' },
  { id: 5, nameKh: 'ទទឹម', nameEn: 'Pomegranate', meaningKh: 'កូនចៅច្រើន សម្បូរសប្បាយ', meaningEn: 'Fertility & abundance', group: 'prosperity' },
  { id: 6, nameKh: 'ម្នាស់', nameEn: 'Pineapple', meaningKh: 'លាភសំណាង ហូរចូល', meaningEn: 'Welcoming good fortune', group: 'prosperity' },
  { id: 7, nameKh: 'ល្ហុងទុំ', nameEn: 'Ripe Papaya', meaningKh: 'សុខុមាលភាព លូតលាស់', meaningEn: 'Health & flourishing', group: 'prosperity' },
  { id: 8, nameKh: 'ត្របែក', nameEn: 'Guava', meaningKh: 'មាំមួន ឋិតថេរ', meaningEn: 'Steadfast devotion', group: 'prosperity' },
  { id: 9, nameKh: 'ក្រូចពោធិ៍សាត់', nameEn: 'Pursat Sweet Orange', meaningKh: 'រុងរឿង មានសិរីមង្គល', meaningEn: 'Auspicious radiance', group: 'prosperity' },

  // Group 2: Abundance & Wealth (ទ្រព្យសម្បត្តិ និងភាពសម្បូរហូរហែ) - 9 items
  { id: 10, nameKh: 'ក្រូចថ្លុង', nameEn: 'Pomelo', meaningKh: 'ការពារ និងថែរក្សាគ្រួសារ', meaningEn: 'Protection & household blessing', group: 'abundance' },
  { id: 11, nameKh: 'ក្រូចឃ្វិច', nameEn: 'Mandarin Orange', meaningKh: 'មាសប្រាក់ ហូរហែ', meaningEn: 'Prosperity & gold', group: 'abundance' },
  { id: 12, nameKh: 'មៀន', nameEn: 'Longan', meaningKh: 'ភ្នែកមាស លាភជ័យ', meaningEn: 'Precious fortune', group: 'abundance' },
  { id: 13, nameKh: 'គូលែន', nameEn: 'Lychee', meaningKh: 'ស្នេហាផ្អែមល្ហែម ភក្ដីភាព', meaningEn: 'Sweet enduring romance', group: 'abundance' },
  { id: 14, nameKh: 'សាវម៉ាវ', nameEn: 'Rambutan', meaningKh: 'ចំណងស្នេហ៍រឹងមាំ', meaningEn: 'Tied hearts forever', group: 'abundance' },
  { id: 15, nameKh: 'មង្ឃុត', nameEn: 'Mangosteen', meaningKh: 'សេចក្តីថ្លៃថ្នូរ ស្មោះត្រង់', meaningEn: 'Nobility & sincerity', group: 'abundance' },
  { id: 16, nameKh: 'ធុរេន', nameEn: 'Durian', meaningKh: 'ទ្រព្យសម្បត្តិដ៏ឧត្តុង្គឧត្តម', meaningEn: 'Royal abundance', group: 'abundance' },
  { id: 17, nameKh: 'ខ្នុរ', nameEn: 'Jackfruit', meaningKh: 'ជួយជ្រោមជ្រែង គាំទ្រគ្នា', meaningEn: 'Mutual support & honor', group: 'abundance' },
  { id: 18, nameKh: 'ល្មុត', nameEn: 'Sapodilla', meaningKh: 'សុភាពរាបសារ ត្រជាក់ចិត្ត', meaningEn: 'Gentleness & peace', group: 'abundance' },

  // Group 3: Sweetness & Longevity (សុភមង្គលផ្អែមល្ហែម និងអាយុយឺនយូរ) - 9 items
  { id: 19, nameKh: 'ទៀបខ្មែរ', nameEn: 'Khmer Sugar Apple', meaningKh: 'សេចក្តីសុខពេញលេញ', meaningEn: 'Complete contentment', group: 'sweetness' },
  { id: 20, nameKh: 'ទៀបបារាំង', nameEn: 'Soursop', meaningKh: 'សុខភាពល្អបរិបូរណ៍', meaningEn: 'Vitality & wellness', group: 'sweetness' },
  { id: 21, nameKh: 'ប៉ោម', nameEn: 'Apple', meaningKh: 'សន្តិភាព ស្ងប់សុខ', meaningEn: 'Peace & serenity', group: 'sweetness' },
  { id: 22, nameKh: 'សារី', nameEn: 'Asian Pear', meaningKh: 'មិនប្រែប្រួល មិនបែកបាក់', meaningEn: 'Unwavering bond', group: 'sweetness' },
  { id: 23, nameKh: 'ទំពាំងបាយជូរ', nameEn: 'Grapes', meaningKh: 'សម្បូរពូជពង្ស វឌ្ឍនភាព', meaningEn: 'Fruitful blessings', group: 'sweetness' },
  { id: 24, nameKh: 'ទន្លាប់', nameEn: 'Persimmon', meaningKh: 'អ្វីៗសម្រេចដូចបំណង', meaningEn: 'Fulfilled wishes', group: 'sweetness' },
  { id: 25, nameKh: 'ស្រកានាគ', nameEn: 'Dragon Fruit', meaningKh: 'ជោគជ័យ កិត្តិយស', meaningEn: 'Strength & prestige', group: 'sweetness' },
  { id: 26, nameKh: 'ឪឡឹក', nameEn: 'Watermelon', meaningKh: 'ទឹកចិត្តទូលាយ ត្រជាក់ចិត្ត', meaningEn: 'Generous warm spirit', group: 'sweetness' },
  { id: 27, nameKh: 'ត្រសក់ផ្អែម', nameEn: 'Honeydew Melon', meaningKh: 'ភាពផ្អែមល្ហែម ជារៀងរហូត', meaningEn: 'Everlasting sweetness', group: 'sweetness' },

  // Group 4: Heritage & Good Fortune (ប្រពៃណី និងសំណាងល្អ) - 9 items
  { id: 28, nameKh: 'ជម្ពូ', nameEn: 'Rose Apple', meaningKh: 'ថ្ពាល់ក្រហម សុភមង្គល', meaningEn: 'Joyful radiance', group: 'heritage' },
  { id: 29, nameKh: 'ពុទ្រា', nameEn: 'Jujube', meaningKh: 'រហ័សរហួន ជោគជ័យ', meaningEn: 'Swift good fortune', group: 'heritage' },
  { id: 30, nameKh: 'ម្កាក់', nameEn: 'Ambarella', meaningKh: 'រសជាតិជីវិត សុខដុមរមនា', meaningEn: 'Balanced harmony', group: 'heritage' },
  { id: 31, nameKh: 'ត្នោតខ្ចី', nameEn: 'Fresh Toddy Palm Fruit', meaningKh: 'មរតកស្រុកស្រែខ្មែរ', meaningEn: 'Cambodian countryside heritage', group: 'heritage' },
  { id: 32, nameKh: 'អំពិលផ្អែម', nameEn: 'Sweet Tamarind', meaningKh: 'ឈ្មោះល្បីល្បាញ ល្អប្រពៃ', meaningEn: 'Honorable reputation', group: 'heritage' },
  { id: 33, nameKh: 'សេដា', nameEn: 'Eggfruit (Canistel)', meaningKh: 'សម្បូរមាសប្រាក់', meaningEn: 'Golden abundance', group: 'heritage' },
  { id: 34, nameKh: 'បឺរ', nameEn: 'Avocado', meaningKh: 'ជីវិតសម្បូរបែប រឹងមាំ', meaningEn: 'Nourished vitality', group: 'heritage' },
  { id: 35, nameKh: 'គីវី', nameEn: 'Kiwi', meaningKh: 'សិរីសួស្តី និងថាមពល', meaningEn: 'Fresh energy & luck', group: 'heritage' },
  { id: 36, nameKh: 'ល្វា', nameEn: 'Sweet Fig', meaningKh: 'គ្រួសាររឹងមាំ ឋិតថេរយូរអង្វែង', meaningEn: 'Enduring household roots', group: 'heritage' },
];

export const ROYAL_CEREMONY_TRAYS: RoyalTrayItem[] = [
  {
    id: 'betel',
    titleKh: 'ពានស្លាម្លូ បារី និងផ្កាសិរីមង្គល',
    titleEn: 'Betel Leaves, Areca & Ceremonial Garlands',
    detailKh: 'តំណាងឱ្យការគោរពដឹងគុណមាតាបិតា និងចាស់ទុំទាំងសងខាង មុនពេលចាប់ផ្ដើមពិធីភ្ជាប់ពាក្យ។',
    detailEn: 'Honoring parents and elders from both families as the sacred opening of the betrothal.',
  },
  {
    id: 'fruits',
    titleKh: 'ពានមាស-ពានប្រាក់ ផ្លែឈើ ៣៦ មុខ',
    titleEn: '36 Auspicious Fruits in Gold & Silver Trays',
    detailKh: 'ផ្លែឈើស្រស់ទាំង ៣៦ មុខរៀបចំយ៉ាងផ្ចិតផ្ចង់ ប្រសិទ្ធពរឱ្យជីវិតគូសម្បូរសប្បាយ និងត្រជាក់ត្រជំ។',
    detailEn: 'Thirty-six carefully arranged fresh fruits symbolizing sweetness, fertility, and prosperity.',
  },
  {
    id: 'cakes',
    titleKh: 'នំប្រពៃណីខ្មែរ និងភេសជ្ជៈមង្គល',
    titleEn: 'Traditional Khmer Wedding Cakes & Refreshments',
    detailKh: 'នំអន្សម នំគម នំបត់ និងនំផ្អែមប្រពៃណីសម្រាប់ជូនចាស់ទុំ និងភ្ញៀវកិត្តិយស។',
    detailEn: 'Handcrafted Khmer ceremonial pastries shared in fellowship with elders and guests.',
  },
  {
    id: 'rings',
    titleKh: 'ចិញ្ចៀនភ្ជាប់ពាក្យ និងសំពត់ហូល-ផាមួង',
    titleEn: 'Engagement Rings & Handwoven Khmer Silk',
    detailKh: 'និមិត្តរូបនៃចំណងស្នេហ៍ភក្ដីភាព និងមរតកសិល្បៈតម្បាញខ្មែរដ៏ថ្លៃថ្នូរ។',
    detailEn: 'Symbol of lifelong commitment paired with heirloom Cambodian handwoven silk.',
  },
];

export const DRESS_CODE_PALETTE: DressSwatch[] = [
  {
    id: 'gold',
    hex: '#C9A86A',
    nameKh: 'មាសសំរិទ្ធ',
    nameEn: 'Champagne Gold',
    noteKh: 'សំពត់ហូល ឬផាមួងពណ៌មាសស្រាល',
    noteEn: 'Champagne gold silk or brocade',
  },
  {
    id: 'ivory',
    hex: '#F4ECDC',
    nameKh: 'សភ្លុករាជវាំង',
    nameEn: 'Pearl Ivory',
    noteKh: 'អាវប៉ាក់ប្រពៃណី ឬអាវសូត្រភ្លុក',
    noteEn: 'Lace blouse or ivory silk shirt',
  },
  {
    id: 'bronze',
    hex: '#8C6833',
    nameKh: 'សំរិទ្ធត្នោត',
    nameEn: 'Heritage Bronze',
    noteKh: 'សម្លៀកបំពាក់ប្រពៃណីបែបអភិជន',
    noteEn: 'Warm bronze ceremonial attire',
  },
  {
    id: 'sage',
    hex: '#6B7A5A',
    nameKh: 'បៃតងស្លឹកត្នោត',
    nameEn: 'Countryside Sage',
    noteKh: 'សម្លៀកបំពាក់ទន់ភ្លន់បែបធម្មជាតិ',
    noteEn: 'Soft countryside palm-leaf sage',
  },
];

export const CLASSIC_KHMER_BLESSINGS: ClassicBlessing[] = [
  {
    id: 'b1',
    titleKh: 'ពរជ័យសិរីមង្គល',
    titleEn: 'Auspicious Prosperity Blessing',
    textKh:
      'សូមជូនពរដល់កូនកំលោះ និងកូនក្រមុំ ឱ្យជួបតែសិរីសួស្តី សុភមង្គល ត្រជាក់ត្រជំដូចទឹកអម្រឹត និងស្រឡាញ់គ្នាជារៀងរហូត។',
    textEn:
      'Wishing the couple boundless joy, serene harmony, and eternal love from this engagement day onward.',
  },
  {
    id: 'b2',
    titleKh: 'ពរជ័យចាស់ទុំប្រពៃណី',
    titleEn: 'Traditional Elder Blessing',
    textKh:
      'សូមប្រសិទ្ធពរជ័យដល់គូស្វាមីភរិយាអនាគត ឱ្យរស់នៅសុខដុមរមនា មានទ្រព្យសម្បត្តិហូរហែ និងកាន់ដៃគ្នារហូតដល់ចាស់កោងខ្នង។',
    textEn:
      'May your union be blessed with lasting harmony, abundant fortune, and lifelong companionship.',
  },
  {
    id: 'b3',
    titleKh: 'ពរជ័យសម្រាប់ក្រុមគ្រួសារទាំងសងខាង',
    titleEn: 'Blessing for Both Families',
    textKh:
      'សូមអបអរសាទរពិធីភ្ជាប់ពាក្យដ៏ឧត្តុង្គឧត្តម! សូមឱ្យចំណងមេត្រីភាពរវាងគ្រួសារទាំងសងខាងកាន់តែរឹងមាំ និងពោរពេញដោយស្នាមញញឹម។',
    textEn:
      'Warmest congratulations on this joyful engagement! May the bond between both families grow ever stronger.',
  },
];
