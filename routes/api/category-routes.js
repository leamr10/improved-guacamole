const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  router.get('/', async (req, res) => {
    try {
      const CategoryData = await Category.findAll({
        include: [
          {
            model: Category,
            attributes: ['id', 'category_name'],
          },
        ],
      });
      res.status(200).json(CategoryData)
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
    try {
      const CategoryData = await Category.create(req.body);
      res.status(200).json(CategoryData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryId = req.params.id;

    const category = await Category.findbyPk(categoryId);

    if (!category) {
      return res.status(404).json({error: 'Category not found'});
    }
    await category.destroy();
    res.json({message: 'Category deleted successfully!'});
  } catch (err) {
    res.status(500).json({error: 'Internal server error'});
  }
});

module.exports = router;