import React from 'react';
import { PlusCircle, Trash2, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
  selectedDate: Date;
  newTodo: string;
  setNewTodo: (value: string) => void;
  addTodo: () => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodoText: (id: string, text: string) => void;
  updateTodoDescription: (id: string, description: string) => void;
  addSubTodo: (todoId: string) => void;
  updateSubTodo: (todoId: string, subTodoId: string, text: string) => void;
  toggleSubTodo: (todoId: string, subTodoId: string) => void;
  deleteSubTodo: (todoId: string, subTodoId: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  selectedDate,
  newTodo,
  setNewTodo,
  addTodo,
  toggleTodo,
  deleteTodo,
  updateTodoText,
  updateTodoDescription,
  addSubTodo,
  updateSubTodo,
  toggleSubTodo,
  deleteSubTodo,
}) => {
  // 완료된 할 일을 맨 아래로 정렬
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 sm:p-6">
        {/* 날짜 표시 */}
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">
          {format(selectedDate, 'yyyy. MM. dd')} 할 일
        </h2>
        
        {/* 할 일 추가 입력 영역 */}
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="flex-grow relative">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
              placeholder="새로운 할 일 추가..."
            />
          </div>
          <button
            onClick={addTodo}
            className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm"
          >
            <PlusCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* 할 일 목록 */}
        <div className="space-y-3 max-h-[calc(100vh-16rem)] overflow-y-auto">
          {sortedTodos.map((todo) => (
            <div
              key={todo._id}
              className={`bg-gray-50 rounded-lg p-3 sm:p-4 transition-all hover:shadow-md border border-gray-100 ${
                todo.completed ? 'opacity-75' : ''
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => toggleTodo(todo._id)}
                  className={`flex-shrink-0 focus:outline-none ${
                    todo.completed ? 'text-green-500' : 'text-gray-400'
                  } hover:scale-110 transition-transform`}
                  aria-label={todo.completed ? "할 일 완료 취소" : "할 일 완료"}
                >
                  <CheckCircle className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={todo.text}
                  onChange={(e) => updateTodoText(todo._id, e.target.value)}
                  className={`flex-grow min-w-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded px-2 text-sm sm:text-base ${
                    todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
                  }`}
                />
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="flex-shrink-0 text-red-500 hover:text-red-600 focus:outline-none hover:scale-110 transition-transform"
                  aria-label="할 일 삭제"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* 설명 입력 영역 */}
              <input
                type="text"
                value={todo.description}
                onChange={(e) => updateTodoDescription(todo._id, e.target.value)}
                className="mt-2 w-full px-3 py-2 text-xs sm:text-sm text-gray-600 bg-white rounded border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="설명 추가..."
              />

              {/* 하위 할 일 목록 */}
              <ul className="mt-2 space-y-1.5">
                {todo.subTodos.map((subTodo) => (
                  <li key={subTodo._id} className="flex items-center gap-2 pl-4 sm:pl-6">
                    <button
                      onClick={() => toggleSubTodo(todo._id, subTodo._id)}
                      className={`flex-shrink-0 focus:outline-none ${
                        subTodo.completed ? 'text-green-500' : 'text-gray-400'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <input
                      type="text"
                      value={subTodo.text}
                      onChange={(e) =>
                        updateSubTodo(todo._id, subTodo._id, e.target.value)
                      }
                      className={`flex-grow min-w-0 bg-transparent text-xs sm:text-sm focus:outline-none ${
                        subTodo.completed ? 'line-through text-gray-500' : 'text-gray-700'
                      }`}
                      placeholder="하위 할 일..."
                    />
                    <button
                      onClick={() => deleteSubTodo(todo._id, subTodo._id)}
                      className="flex-shrink-0 text-red-500 hover:text-red-600 focus:outline-none"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>

              {/* 하위 할 일 추가 버튼 */}
              <button
                onClick={() => addSubTodo(todo._id)}
                className="mt-2 text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 focus:outline-none"
              >
                + 하위 할 일 추가
              </button>
            </div>
          ))}
          
          {/* 할 일이 없을 때 메시지 */}
          {todos.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm sm:text-base">
                등록된 할 일이 없습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;