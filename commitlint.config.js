module.exports = {
  rules: {
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build', // 修改项目构建系统
        'ci', // 修改项目继续集成流程
        'docs', // 文档更新
        'feat', // 新增功能
        'fix', // bug 修复
        'perf', // 性能优化
        'refactor', // 重构代码(既没有新增功能，也没有修复 bug)
        'style', // 不影响程序逻辑的代码修改(修改空白字符，补全缺失的分号等)
        'revert', // 回滚某个更早之前的提交
        'test', // 测试
        'chore' //不属于以上类型的其他类型
      ]
    ]
  }
}
