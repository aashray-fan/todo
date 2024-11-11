import React, { useEffect, useRef, useState } from 'react'
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import editIcon from '../assets/icons/edit.png'
import trashIcon from '../assets/icons/trash/trash.png'
import { Task } from './TasksList'

interface TaskItemProps {
  index: number;
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  updateTaskName: (id: number, newTaskName: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  index,
  task,
  toggleTaskDone,
  removeTask,
  updateTaskName
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editingTaskText, setEditingTaskText] = useState(task.title)
  const textInputRef = useRef(null)

  function handleStartEdition() {
    setIsEditing(true)
  }

  function handleCancelEdition() {
    setIsEditing(false)
    setEditingTaskText(task.title)
  }

  function handleSubmitEditing() {
    updateTaskName(task.id, editingTaskText)
    setIsEditing(false)
  }

  function handleRemoveTask(id: number) {
    if (!isEditing) {
      Alert.alert('Remover tarefa', 'Tem certeza que deseja remover essa tarefa?', [
        { text: 'Não' },
        {
          text: 'Sim',
          onPress: () => removeTask(id)
        }
      ])
    }
  }

  useEffect(() => {
    if (isEditing) {
      textInputRef.current?.focus()
    } else {
      textInputRef.current?.blur()
    }
  }, [isEditing])

  return (
    <View
      style={[styles.mainContainer, isEditing && styles.activeEditing]}
      testID={`button-${index}`}
    >
      <TouchableOpacity
        testID={`marker-${index}`}
        style={[styles.checkButton, !!task?.done && styles.markedCheckButton]}
        onPress={() => toggleTaskDone(task.id)}
      >
        {!!task?.done && <Icon name="check" size={24} color="#FFF" />}
      </TouchableOpacity>
      <View style={styles.inputView}>
        {/* {isEditing ? ( */}
        <TextInput
          ref={textInputRef}
          style={[styles.textInput, !!task?.done && styles.markedTextInput]}
          editable={isEditing}
          // multiline={true}
          onChangeText={setEditingTaskText}
          value={editingTaskText}
          onSubmitEditing={handleSubmitEditing}
          returnKeyType={'done'}
        />
        {/* ) : (
           <Text style={styles.textInput}>{task?.title}</Text>
        )} */}
      </View>

      <TouchableOpacity
        testID={`edit-${index}`}
        style={styles.editButton}
        onPress={!isEditing ? handleStartEdition : handleCancelEdition}
      >
        {!isEditing ? (
          <Image source={editIcon} style={styles.buttonImage} />
        ) : (
          <Icon name="x" size={24} color="#bbb" />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        testID={`trash-${index}`}
        style={styles.deleteButton}
        onPress={() => handleRemoveTask(task.id)}
      >
        <Image style={[styles.buttonImage, { opacity: isEditing ? 0.4 : 1 }]} source={trashIcon} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  activeEditing: {
    backgroundColor: '#FFF'
  },
  checkButton: {
    width: '6%',
    aspectRatio: 1,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: '4%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  markedCheckButton: {
    borderRadius: 4,
    backgroundColor: '#1DB863'
  },
  inputView: {
    width: '70%',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  taskText: {},
  textInput: {
    color: '#666',
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    width: '100%'
  },
  markedTextInput: {
    color: '#1DB863',
    textDecorationLine: 'line-through'
  },
  editButton: {
    // borderRightColor: 'rgba(196, 196, 196, 0.24)',
    // borderRightWidth: 1,
    width: '10%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  deleteButton: {
    width: '10%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  buttonImage: {
    height: '80%',
    width: '80%'
  }
  // //
  // taskButton: {
  //   paddingVertical: 15,
  //   borderRadius: 4,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   backgroundColor: 'red',
  //   height: '100%',
  //   width: '80%',
  //   paddingHorizontal: '4%'
  // },
  // taskMarker: {
  //   width: '8%',
  //   aspectRatio: 1,
  //   borderRadius: 4,
  //   borderWidth: 1,
  //   borderColor: '#B2B2B2',
  //   marginRight: '4%',
  //   alignItems: 'center',
  //   justifyContent: 'center'
  // },
  // taskText: {
  //   color: '#666',
  //   fontFamily: 'Inter-Medium',
  //   fontSize: 18,
  //   backgroundColor: 'pink',
  //   height: '100%',
  //   width: '80%'
  // },
  // taskMarkerDone: {
  //   width: '8%',
  //   aspectRatio: 1,
  //   borderRadius: 4,
  //   backgroundColor: '#1DB863',
  //   marginRight: 15,
  //   alignItems: 'center',
  //   justifyContent: 'center'
  // },
  // taskTextDone: {
  //   fontFamily: 'Inter-Medium',
  //   fontSize: 18,
  //   backgroundColor: 'pink',
  //   height: '100%',
  //   width: '100%'
  // }
  // iconsContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center'
  // }
})
