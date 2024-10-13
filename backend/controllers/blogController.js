import Article from '../models/blog.js';
import User from '../models/user.js';


export const addArticle = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const article = new Article({
      title: req.body.title,
      body: req.body.body,
      editor: req.body.editor,
      isEmployee: req.body.isEmployee,
      author: user._id,
    });

    const savedArticle = await article.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    console.error('Error adding article:', error);
    res.status(500).send('Error adding article');
  }
};


