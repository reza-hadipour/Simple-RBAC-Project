const express = require('express');
const router = express.Router();
const { checkPermission } = require('../middlewares/rbacMiddleware');
const { init, getAllRecord, createRecord, updateRecord, deleteRecord } = require('../controllers/recordController');
const Permissions = require('../models/permissions');

// Controller

router.get('/init', init);
router.get('/records', ((permission) => {
    return (req, res, next) => {
    const userRole = req.user ? req.user.role : 'anonymous';
    const userPermissions = new Permissions().getPermissionsByRoleName(userRole);

    if (userPermissions.includes(permission)) {
        return next();
    } else {
        return res.status(403).json({ error: "Access denied" });
    }
}
})('delete_record')
    , getAllRecord);
// router.get('/records', checkPermission('read_record'), getAllRecord);
router.post('/records', checkPermission('create_record'), createRecord);
router.put('/records/:id', checkPermission('update_record'), updateRecord);
router.delete('/records/:id', checkPermission('delete_record'), deleteRecord);

module.exports = router;
